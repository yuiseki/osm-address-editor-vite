import { AddressStructureType } from "..";

export const AddressFieldsDEU: AddressStructureType = {
  defaultComment: "Aktualisierte Adresse",
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
    {
      key: "addr:suburb",
      displayName: "District/Suburb",
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
