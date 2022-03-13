import { useCallback } from "react";
import * as turf from "@turf/turf";

const countryGeoJSONKey = "country-geojson-v5.0.0";

export const useCountry = () => {
  const detectCountry = useCallback(async (latitude, longitude) => {
    const res = await fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson"
    );
    const countryGeoJSON = await res.json();

    for (const feature of countryGeoJSON.features) {
      if (turf.booleanPointInPolygon([latitude, longitude], feature.geometry)) {
        console.log("country: ", feature.properties);
        return feature;
      }
    }
  }, []);

  return { detectCountry };
};
