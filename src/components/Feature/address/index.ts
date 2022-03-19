import { AddressFieldsCHN } from "./countries/CHN";
import { AddressFieldsDEU } from "./countries/DEU";
import { AddressFieldsJPN } from "./countries/JPN";

export type AddressFieldType = {
  key: string;
  displayName: string;
  placeholder: string;
  prefix?: string;
};

export type AddressStructureType = {
  postcodeField: AddressFieldType;
  mainFields: AddressFieldType[];
  detailFields: AddressFieldType[];
  defaultComment: string;
};

export const AddressFieldsByCountry: {
  [key: string]: AddressStructureType;
} = {
  JPN: AddressFieldsJPN,
  CHN: AddressFieldsCHN,
  DEU: AddressFieldsDEU,
};
