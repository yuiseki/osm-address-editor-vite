import { useCallback } from "react";
import osmtogeojson from "osmtogeojson";
import * as OSM from "osm-api";
import * as turf from "@turf/turf";

import type { FeatureCollection, Polygon } from "geojson";

export const useOverpass = () => {
  const fetchOverpass = useCallback(async (latitude, longitude) => {
    console.log("overpass: loading...");
    let query = "[out:json]";
    query += "[timeout:25];\n";
    query += 'nwr["building"="yes"]';
    query += `(around:${200},${latitude},${longitude});\n`;
    query += "out meta geom;";
    console.log(query);
    const res = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`,
      {}
    );
    const json = await res.json();
    console.log(json);

    console.log("overpass: ", json.elements.length);
    const geojson = osmtogeojson(json) as FeatureCollection<Polygon>;

    // convert
    for await (const feature of geojson.features) {
      if (!feature.properties) {
        feature.properties = {};
      }
      const poly = turf.polygon(feature.geometry.coordinates);
      var center = turf.centroid(poly);
      feature.properties.center = center.geometry.coordinates;
      const username = feature.properties.user;
      const uid = feature.properties.uid;
      if (uid) {
        let iconHref = localStorage.getItem(uid + "-icon");
        if (iconHref === null) {
          const user = await OSM.getUser(uid);
          if (user.img?.href) {
            iconHref = user.img.href;
            localStorage.setItem(uid + "-icon", user.img.href);
          } else {
            localStorage.setItem(uid + "-icon", "");
          }
        }
        feature.properties.userIconHref = iconHref || "";
      }
    }
    console.log("overpass: ", geojson);
    console.log("overpass: loaded.");
    return geojson;
  }, []);
  return {
    fetchOverpass,
  };
};
