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
    query += 'way["building"="yes"]';
    query += `(around:${300},${latitude},${longitude});\n`;
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

    console.log("overpass geojson raw: ", geojson);

    // convert
    for await (const feature of geojson.features) {
      if (!feature.properties) {
        continue;
      }
      // add id of feature
      feature.id = feature.properties.id.split("/")[1];

      // add center of polygon
      if (feature.geometry.type === "Polygon") {
        const poly = turf.polygon(feature.geometry.coordinates);
        var center = turf.centroid(poly);
        feature.properties.center = center.geometry.coordinates;
      }

      // add icon href of last editor
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
    console.log("overpass geojson converted: ", geojson);
    console.log("overpass: loaded.");
    return geojson;
  }, []);
  return {
    fetchOverpass,
  };
};
