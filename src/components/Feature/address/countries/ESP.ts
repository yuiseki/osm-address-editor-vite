lines (33 sloc) 670 Bytes
import { AddressStructureType } from "..";

export const AddressFieldsESP: AddressStructureType = {
  defaultComment: "Dirección actualizada",
  postcodeField: {
    key: "addr:postcode",
    displayName: "Código postal",
    placeholder: "",
  },
  mainFields: [
    {
      key: "addr:city",
      displayName: "Población",
      placeholder: "",
    },
    {
      key: "addr:suburb",
      displayName: "Distrito/Barrio",
      placeholder: "",
    },
  ],
  detailFields: [
    {
      key: "addr:street",
      displayName: "Calle",
      placeholder: "",
    },
    {
      key: "addr:housenumber",
      displayName: "Número",
      placeholder: "",
    },
  ],
};
