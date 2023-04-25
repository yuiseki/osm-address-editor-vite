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

  const fetchOverpassBuildings = useCallback(
    async (latitude: number, longitude: number, zoom: number) => {
      if (loadingOverpass) {
        return emptyGeoJSON;
      }

      console.log(zoom);
      if (zoom < 16) {
        return emptyGeoJSON;
      }

      setLoadingOverpass(true);
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
    },
    []
  );

  const [loadingOverpassAdmin, setLoadingOverpassAdmin] = useState(false);
  const fetchOverpassAdmin = useCallback(async (nodeIds: number[]) => {
    console.log("overpass: loading...", nodeIds);
    setLoadingOverpassAdmin(true);

    const queryParent = `
      [out:json]
      [timeout:25];
      node(id:${nodeIds.join(",")})->.nodes;
      .nodes is_in;
      area._[boundary=administrative];
      out;
    `;
    console.log(queryParent);
    const resParent = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
        queryParent
      )}`,
      {}
    );
    if (resParent.status !== 200) {
      setLoadingOverpassAdmin(false);
      return undefined;
    }
    const jsonParent = await resParent.json();
    console.log("overpass json parent elements: ", jsonParent.elements);

    const around = 250;
    const queryChild = `
      [out:json]
      [timeout:25];
      node(id:${nodeIds.join(",")})->.nodes;
      rel
        [type=boundary]
        [boundary=administrative]
        (around.nodes:${around});
      out;
      `;
    console.log(queryChild);
    const resChild = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
        queryChild
      )}`,
      {}
    );
    if (resChild.status !== 200) {
      setLoadingOverpassAdmin(false);
      return undefined;
    }
    const jsonChild = await resChild.json();
    console.log("overpass json child elements: ", jsonChild.elements);

    const queryNeighbour = `
      [out:json]
      [timeout:25];
      node(id:${nodeIds.join(",")})->.nodes;
      node
        [place=neighbourhood]
        (around.nodes:${around});
      out;
      `;
    console.log(queryNeighbour);
    const resNeighbour = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
        queryNeighbour
      )}`,
      {}
    );
    if (resNeighbour.status !== 200) {
      setLoadingOverpassAdmin(false);
      return undefined;
    }
    const jsonNeighbour = await resNeighbour.json();
    console.log("overpass json neighbour elements: ", jsonNeighbour.elements);

    setLoadingOverpassAdmin(false);
    return [
      ...jsonParent.elements,
      ...jsonChild.elements,
      ...jsonNeighbour.elements,
    ];
  }, []);

  return {
    fetchOverpassBuildings,
    fetchOverpassAdmin,
    loadingOverpass,
    loadingOverpassAdmin,
  };
};
