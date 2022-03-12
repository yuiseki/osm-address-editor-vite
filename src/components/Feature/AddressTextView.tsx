import { MapboxGeoJSONFeature } from "react-map-gl";
import { AddressDetailFieldList, AddressMainFieldList, AddressPostcodeField } from "./fields";

export const AddressTextView: React.VFC<{ feature: MapboxGeoJSONFeature }> = ({
  feature,
}) => {
  return (
    <>
      <span className="addr:postcode">
        {feature.properties?.[AddressPostcodeField.key]}
      </span>{" "}
      {AddressMainFieldList.map((f) => {
        return (
          <span key={f.key} className={f.key}>
            {feature.properties?.[f.key]}
          </span>
        );
      })}{" "}
      {AddressDetailFieldList.map((f) => {
        return (
          <span key={f.key} className={f.key}>
            {f.prefix ?? f.prefix}
            {feature.properties?.[f.key]}
          </span>
        );
      })}
    </>
  );
};
