import { useCallback, useState } from "react";
import osmtogeojson from "osmtogeojson";
import * as OSM from "osm-api";
import * as turf from "@turf/turf";

import type { FeatureCollection, Point, Polygon } from "geojson";

const emptyGeoJSON = {
  type: "FeatureCollection",
  features: [],
} as FeatureCollection;

export const useOverpass = () => {
  const [loadingOverpass, setLoadingOverpass] = useState(false);

  const fetchOverpass = useCallback(async (latitude, longitude, zoom) => {
    console.log(zoom);
    if (zoom < 16) {
      return emptyGeoJSON;
    }
    let around = 300;
    if (zoom > 17) {
      around = 200;
    }
    if (zoom > 18) {
      around = 100;
    }
    if (zoom > 19) {
      around = 50;
    }

    if (loadingOverpass) {
      return emptyGeoJSON;
    }

    setLoadingOverpass(true);

    console.log("overpass: loading...");

    // build query
    let query = "[out:json]";
    query += "[timeout:25];\n";
    query += 'nwr["building"]';
    query += `(around:${around},${latitude},${longitude});\n`;
    query += "out meta geom;";
    console.log(query);

    // call overpass api
    const res = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`,
      {}
    );
    if (res.status !== 200) {
      setLoadingOverpass(false);
      return emptyGeoJSON;
    }
    // convert res to json
    const json = await res.json();
    console.log("overpass json elements: ", json.elements);

    // convert raw json to geojson
    const geojson = osmtogeojson(json) as FeatureCollection<Polygon | Point>;
    console.log("overpass osmtogeojson raw: ", geojson);

    // convert for display and editing
    for await (const feature of geojson.features) {
      if (!feature.properties) {
        continue;
      }

      // add id of feature as number
      feature.id = feature.properties.id.split("/")[1];

      // keep tags and nodes of original element
      const element = json.elements.filter((e: any) => {
        if (!feature.id) {
          return false;
        }
        if (typeof feature.id === "number") {
          return e.id === feature.id;
        }
        return e.id === parseInt(feature.id);
      })?.[0];
      if (element) {
        feature.properties.tags = element.tags;
        feature.properties.nodes = element.nodes;
      }

      // add center of polygon
      if (feature.geometry.type === "Polygon") {
        const poly = turf.polygon(feature.geometry.coordinates);
        var center = turf.centroid(poly);
        feature.properties.center = center.geometry.coordinates;
      }

      if (feature.geometry.type === "Point") {
        feature.properties.center = feature.geometry.coordinates;
      }

      // add icon href of last editor
      // using localStorage as cache
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

    console.log("overpass osmtogeojson converted: ", geojson);
    console.log("overpass: loaded.");
    setLoadingOverpass(false);
    return geojson;
  }, []);
  return {
    fetchOverpass,
    loadingOverpass,
  };
};
