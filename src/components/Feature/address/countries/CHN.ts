import { AddressStructureType } from "..";

export const AddressFieldsCHN:AddressStructureType = {
  defaultComment: "更新地址",
  postcodeField: {
    key: "addr:postcode",
    displayName: "Postcode",
    placeholder: "",
  },
  mainFields: [
    {
      key: "addr:province",
      displayName: "Province/Municipality/AR/SAR",
      placeholder: "",
    },
    {
      key: "addr:city",
      displayName: "City/Prefecture/League",
      placeholder: "",
    },
    {
      key: "addr:district",
      displayName: "District/County/Banner",
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
