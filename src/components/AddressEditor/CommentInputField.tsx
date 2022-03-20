import { FormEvent, useCallback, useEffect, useState } from "react";

export const CommentInputField: React.VFC<{
  placeholder?: string;
  defaultValue?: string;
}> = ({ placeholder, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className="w-full md:w-1/3 py-1 px-2 mb-6 md:mb-0">
      <label
        className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="comment"
      >
        Comment for this changeset (required)
      </label>
      <input
        className="appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500"
        id="comment"
        name="comment"
        type="text"
        placeholder={placeholder}
        value={value}
        required={true}
        onChange={onChange}
      />
    </div>
  );
};
