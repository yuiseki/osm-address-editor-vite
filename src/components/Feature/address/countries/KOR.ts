import { AddressStructureType } from "..";

export const AddressFieldsKOR: AddressStructureType = {
  defaultComment: "주소 업데이트",
  postcodeField: {
    key: "addr:postcode",
    displayName: "Postcode",
    placeholder: "",
  },
  mainFields: [
    {
      key: "addr:city",
      displayName: "City",
      placeholder: "",
    },
  ],
  detailFields: [
    {
      key: "addr:street",
      displayName: "Street",
      placeholder: "",
    },
    {
      key: "addr:housenumber",
      displayName: "House number",
      placeholder: "",
    },
  ],
};
