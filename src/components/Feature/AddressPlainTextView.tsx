import { MapboxGeoJSONFeature } from "react-map-gl";

export const AddressPlainTextView: React.VFC<{
  feature: MapboxGeoJSONFeature;
}> = ({ feature }) => {
  return (
    <>
      {feature.properties &&
        Object.keys(feature.properties).map((key) => {
          if (key.startsWith("addr")) {
            return (
              <div className={key}>
                <span className="underline">{key}</span>
                {" = "}
                <span>{feature.properties?.[key]}</span>
              </div>
            );
          }
        })}
    </>
  );
};
