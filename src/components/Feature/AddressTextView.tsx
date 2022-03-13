import { MapboxGeoJSONFeature } from "react-map-gl";

export const AddressTextView: React.VFC<{ feature: MapboxGeoJSONFeature }> = ({
  feature,
}) => {
  return (
    <>
      {feature.properties &&
        Object.keys(feature.properties).map((key) => {
          if (key.startsWith("addr")) {
            return <span className={key}>{feature.properties?.[key]} </span>;
          }
        })}
    </>
  );
};
