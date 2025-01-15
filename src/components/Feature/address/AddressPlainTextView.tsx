import { MapGeoJSONFeature } from "react-map-gl/maplibre";

export const AddressPlainTextView: React.FC<{
  feature: MapGeoJSONFeature;
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
