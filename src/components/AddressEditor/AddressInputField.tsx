import { FormEvent, useCallback, useEffect, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";
import { AddressFieldType } from "../Feature/address";

export const AddressInputField: React.VFC<{
  feature: MapboxGeoJSONFeature;
  fieldOption: AddressFieldType;
  suggestList?: any[];
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}> = ({ feature, fieldOption, suggestList, onChange: _onChange }) => {
  const [value, setValue] = useState(feature.properties?.[fieldOption.key]);

  useEffect(() => {
    setValue(feature.properties?.[fieldOption.key]);
  }, [feature]);

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    if (_onChange) {
      _onChange(e);
    }
  }, []);

  return (
    <div className="w-full md:w-1/6 py-1 px-2 mb-6 md:mb-0">
      <label
        className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={fieldOption.key}
      >
        {fieldOption.displayName ? fieldOption.displayName : fieldOption.key}
      </label>
      <input
        className="appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500"
        autoComplete="on"
        list={fieldOption.key + "-list"}
        id={fieldOption.key}
        name={fieldOption.key}
        type="text"
        placeholder={fieldOption.placeholder}
        value={value}
        onChange={onChange}
      />
      <datalist id={fieldOption.key + "-list"}>
        {suggestList &&
          suggestList.map((suggest) => {
            if (
              parseInt(suggest["tags"]["admin_level"]) ===
              fieldOption.adminLevel
            ) {
              return (
                <option key={suggest["id"]} value={suggest["tags"]["name"]} />
              );
            } else if (
              suggest["type"] === "node" &&
              fieldOption.adminLevel === 9
            ) {
              return (
                <option key={suggest["id"]} value={suggest["tags"]["name"]} />
              );
            }
          })}
      </datalist>
    </div>
  );
};
