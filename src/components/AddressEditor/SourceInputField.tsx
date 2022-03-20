import { FormEvent, useCallback, useEffect, useState } from "react";

export const SourceInputField: React.VFC<{}> = () => {
  return (
    <div className="w-full md:w-1/6 py-1 px-2 mb-6 md:mb-0">
      <label
        className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="source"
      >
        Source of this changeset (* required)
      </label>
      <input
        className="appearance-none block w-full leading-tight rounded py-2 px-1 border border-gray-300 bg-gray-100 text-black placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500"
        id="source"
        name="source"
        type="text"
        placeholder="OpenStreetMap"
        defaultValue=""
        required={true}
      />
    </div>
  );
};
