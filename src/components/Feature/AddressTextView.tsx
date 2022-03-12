import { MapboxGeoJSONFeature } from "react-map-gl";
import {
  AddressDetailFieldList,
  AddressMainFieldList,
  AddressPostcodeField,
} from "./fields";

export const AddressTextView: React.VFC<{ feature: MapboxGeoJSONFeature }> = ({
  feature,
}) => {
  return (
    <>
      {feature.properties?.[AddressPostcodeField.key] && (
        <span className="addr:postcode">
          {feature.properties?.[AddressPostcodeField.key]}
        </span>
      )}{" "}
      {AddressMainFieldList.map((f) => {
        if (!feature.properties?.[f.key]) {
          return null;
        }
        return (
          <span key={f.key} className={f.key}>
            {feature.properties?.[f.key]}
          </span>
        );
      })}{" "}
      {AddressDetailFieldList.map((f) => {
        if (!feature.properties?.[f.key]) {
          return null;
        }
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
