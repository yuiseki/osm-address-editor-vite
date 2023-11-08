import { MapGeoJSONFeature } from "react-map-gl/maplibre";

export const CoordinatesTextView: React.VFC<{
  feature: MapGeoJSONFeature;
}> = ({ feature }) => {
  const center = JSON.parse(feature.properties?.center);
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
