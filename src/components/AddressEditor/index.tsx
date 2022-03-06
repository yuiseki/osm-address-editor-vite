import { FormEvent, useCallback, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";

const AddressPostcode = {
  key: "addr:postcode",
  displayName: "郵便番号",
  placeholder: "101-0021",
};
const AddressMainFieldList = [
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
const AddressDetailFieldList = [
  {
    key: "addr:neighbourhood",
    displayName: "丁目",
    placeholder: "1丁目",
  },
  {
    key: "addr:block_number",
    displayName: "番地",
    placeholder: "10",
  },
  {
    key: "addr:housenumber",
    displayName: "号",
    placeholder: "10",
    prefix: "-",
  },
];

const AddressInputField: React.VFC<{
  feature: MapboxGeoJSONFeature;
  fieldName: string;
  label?: string;
  placeholder?: string;
}> = ({ feature, fieldName, label, placeholder }) => {
  const [value, setValue] = useState(feature.properties?.[fieldName]);
  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);
  return (
    <div className="w-full md:w-1/6 py-1 px-2 mb-6 md:mb-0">
      <label
        className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={fieldName}
      >
        {label ? label : fieldName}
      </label>
      <input
        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={fieldName}
        name={fieldName}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const CoordinatesTextView: React.VFC<{
  feature: MapboxGeoJSONFeature;
}> = ({ feature }) => {
  const center = JSON.parse(feature.properties?.center);
  return (
    <>
      <span className="longitude">
        Longitude: {Math.round(center[0] * 10000) / 10000}
      </span>
      {", "}
      <span className="latitude">
        Latitude: {Math.round(center[1] * 10000) / 10000}{" "}
      </span>
    </>
  );
};

export const AddressTextView: React.VFC<{ feature: MapboxGeoJSONFeature }> = ({
  feature,
}) => {
  return (
    <>
      <span className="addr:postcode">
        {feature.properties?.[AddressPostcode.key]}
      </span>{" "}
      {AddressMainFieldList.map((f) => {
        return <span className={f.key}>{feature.properties?.[f.key]}</span>;
      })}{" "}
      {AddressDetailFieldList.map((f) => {
        return (
          <span className={f.key}>
            {f.prefix ?? f.prefix}
            {feature.properties?.[f.key]}
          </span>
        );
      })}
    </>
  );
};

export const AddressEditor: React.VFC<{ feature: MapboxGeoJSONFeature }> = ({
  feature,
}) => {
  return (
    <div>
      {feature.properties && (
        <>
          <div>
            OSM:{" "}
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href={"https://www.openstreetmap.org/" + feature.properties.id}
              target="_blank"
            >
              {feature.properties.id}
            </a>
            {" | "}
            <CoordinatesTextView feature={feature} />
            {" | "}
            <span>
              Address:{" "}
              <span className="underline">
                <AddressTextView feature={feature} />
              </span>
            </span>
          </div>
          <div className="flex flex-wrap">
            <AddressInputField
              feature={feature}
              fieldName={AddressPostcode.key}
              label={AddressPostcode.displayName}
              placeholder={AddressPostcode.placeholder}
            />
            {AddressMainFieldList.map((field) => {
              return (
                <AddressInputField
                  feature={feature}
                  fieldName={field.key}
                  label={field.displayName}
                  placeholder={field.placeholder}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap">
            {AddressDetailFieldList.map((field) => {
              return (
                <AddressInputField
                  feature={feature}
                  fieldName={field.key}
                  label={field.displayName}
                  placeholder={field.placeholder}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
