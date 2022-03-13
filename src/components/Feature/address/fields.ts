export type AddressFieldType = {
  key: string;
  displayName: string;
  placeholder: string;
  prefix?: string;
};

export const AddressFieldsByCountry: {
  [key: string]: {
    postcodeField: AddressFieldType;
    mainFields: AddressFieldType[];
    detailFields: AddressFieldType[];
  };
} = {
  JPN: {
    postcodeField: {
      key: "addr:postcode",
      displayName: "郵便番号",
      placeholder: "101-0021",
    },
    mainFields: [
      {
        key: "addr:province",
        displayName: "都道府県",
        placeholder: "東京都",
      },
      {
        key: "addr:city",
        displayName: "市区町村",
        placeholder: "千代田区",
      },
      {
        key: "addr:quarter",
        displayName: "地名",
        placeholder: "外神田",
      },
    ],
    detailFields: [
      {
        key: "addr:neighbourhood",
        displayName: "丁目",
        placeholder: "1丁目",
      },
      {
        key: "addr:block_number",
        displayName: "番地",
        placeholder: "17",
      },
      {
        key: "addr:housenumber",
        displayName: "号",
        placeholder: "6",
        prefix: "-",
      },
    ],
  },
  CHN: {
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
  },
};
