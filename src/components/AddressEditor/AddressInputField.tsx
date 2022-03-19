import { FormEvent, useCallback, useEffect, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";

export const AddressInputField: React.VFC<{
  feature: MapboxGeoJSONFeature;
  fieldName: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}> = ({ feature, fieldName, label, placeholder, onChange: _onChange }) => {
  const [value, setValue] = useState(feature.properties?.[fieldName]);

  useEffect(() => {
    setValue(feature.properties?.[fieldName]);
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
