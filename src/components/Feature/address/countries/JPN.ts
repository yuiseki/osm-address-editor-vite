import { AddressStructureType } from "..";

export const AddressFieldsJPN: AddressStructureType = {
  defaultComment: "住所を更新",
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
      adminLevel: 4
    },
    {
      key: "addr:city",
      displayName: "市町村と東京23区",
      placeholder: "千代田区",
      adminLevel: 7
    },
    {
      key: "addr:suburb",
      displayName: "政令指定都市の区",
      placeholder: "",
    },
    {
      key: "addr:quarter",
      displayName: "地名",
      placeholder: "外神田",
      adminLevel: 9
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
};
