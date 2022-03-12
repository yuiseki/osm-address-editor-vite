export const AddressPostcodeField = {
  key: "addr:postcode",
  displayName: "郵便番号",
  placeholder: "101-0021",
};

export const AddressMainFieldList = [
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
];

export const AddressDetailFieldList = [
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
];

export const AddressKeys = [
  AddressPostcodeField.key,
  ...AddressMainFieldList.map((a) => a.key),
  ...AddressDetailFieldList.map((a) => a.key),
];
