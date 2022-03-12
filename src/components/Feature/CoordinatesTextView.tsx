import { MapboxGeoJSONFeature } from "react-map-gl";

export const CoordinatesTextView: React.VFC<{
  feature: MapboxGeoJSONFeature;
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
