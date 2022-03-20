import { MapboxGeoJSONFeature } from "react-map-gl";
import { AddressStructureType } from ".";

export const AddressTextViewByCountry: React.VFC<{
  feature: MapboxGeoJSONFeature;
  fields: AddressStructureType;
}> = ({ feature, fields }) => {
  if (!feature.properties) {
    return null;
  }
  return (
    <>
      {fields.postcodeField && (
        <span>{feature.properties[fields.postcodeField.key]}</span>
      )}{" "}
      {fields.mainFields &&
        fields.mainFields.map((field) => {
          return (
            <>
              <span>{feature.properties?.[field.key]}</span>{" "}
            </>
          );
        })}
      {fields.detailFields &&
        fields.detailFields.map((field) => {
          return (
            <>
              <span>{feature.properties?.[field.key]}</span>{" "}
            </>
          );
        })}
    </>
  );
};
