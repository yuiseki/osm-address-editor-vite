import { useCallback } from "react";
import osmtogeojson from "osmtogeojson";
import type { FeatureCollection, GeometryObject } from "geojson";
import { ViewState } from "react-map-gl";

export const useOverpass = () => {
  const fetchOverpass = useCallback(async (latitude, longitude) => {
    console.log("overpass: loading...");
    let query = "[out:json]";
    query += "[timeout:25];\n";
    query += 'nwr["building"="yes"]';
    query += `(around:${150},${latitude},${longitude});\n`;
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
    for (const element of json.elements) {
      console.log(element.user, element.uid);
    }
    console.log("overpass: ", osmtogeojson(json));
    return osmtogeojson(json) as FeatureCollection<GeometryObject>;
  }, []);
  return {
    fetchOverpass,
  };
};
