import { FormEvent, useCallback, useEffect, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";
import * as OSM from "osm-api";
import { LoginButton } from "../LoginButton";

const AddressPostcodeField = {
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
        className="appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500"
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
        {feature.properties?.[AddressPostcodeField.key]}
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

export const AddressEditor: React.VFC<{
  feature: MapboxGeoJSONFeature;
  onCancel: () => void;
}> = ({ feature, onCancel }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(OSM.isLoggedIn());
  }, []);

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
          <form>
            <div className="flex flex-wrap">
              <AddressInputField
                feature={feature}
                fieldName={AddressPostcodeField.key}
                label={AddressPostcodeField.displayName}
                placeholder={AddressPostcodeField.placeholder}
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
            <div className="flex flex-wrap">
              <div className="w-full py-2 px-2 mb-6 md:mb-0">
                <button
                  onClick={onCancel}
                  className="button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800"
                >
                  Cancel
                </button>
                <button className="button rounded mr-4 py-2 px-3 bg-green-300 text-gray-800 hover:text-white">
                  Load address from coordinates
                </button>
                <button
                  disabled={!loggedIn}
                  className="button rounded mr-2 py-2 px-3 bg-blue-300 text-gray-800 disabled:bg-blue-100 disabled:text-gray-400 hover:text-white"
                >
                  Submit to OpenStreetMap
                </button>
                {!loggedIn && (
                  <>
                    <span className="mr-2 underline text-red-600">
                      Require logged in before you submit data to OpenStreetMap
                    </span>
                    <LoginButton />
                  </>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
