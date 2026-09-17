import { MapGeoJSONFeature } from "react-map-gl/maplibre";

import { parseFeatureProperty } from "../../lib/feature/properties";

export const CoordinatesTextView: React.FC<{
  feature: MapGeoJSONFeature;
}> = ({ feature }) => {
  const center = parseFeatureProperty<number[]>(feature.properties?.center);
  return (
    <>
      <span className="longitude">
        Longitude: {Math.round(center[0] * 10000) / 10000}
      </span>
      {", "}
      <span className="latitude">
        Latitude: {Math.round(center[1] * 10000) / 10000}{" "}
      </span>
    </>
  );
};
