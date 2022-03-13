import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";
import * as OSM from "osm-api";
import type { Feature } from "geojson";
import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import { LoginButton } from "../Header/LoggedInButton";
import { CoordinatesTextView } from "../Feature/CoordinatesTextView";
import { AddressTextView } from "../Feature/AddressTextView";
import {
  AddressDetailFieldList,
  AddressMainFieldList,
  AddressPostcodeField,
} from "../Feature/fields";
import { OsmChange, OsmWay } from "osm-api";
import { useCountry } from "../../lib/hooks/country";

const DEFAULT_TAGS = {
  attribution: "https://yuiseki.github.io/osm-address-editor-vite/",
  host: "https://yuiseki.github.io/osm-address-editor-vite/",
  created_by: "osm-address-editor-vite",
  locale: navigator.language,
  comment: "Update address",
};

const AddressInputField: React.VFC<{
  feature: MapboxGeoJSONFeature;
  fieldName: string;
  label?: string;
  placeholder?: string;
}> = ({ feature, fieldName, label, placeholder }) => {
  const [value, setValue] = useState(feature.properties?.[fieldName]);

  useEffect(() => {
    setValue(feature.properties?.[fieldName]);
  }, [feature]);

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

export const AddressEditor: React.VFC<{
  feature: MapboxGeoJSONFeature;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ feature, onCancel, onSubmit }) => {
  const { detectCountry } = useCountry();

  const center = JSON.parse(feature.properties?.center);
  const [countryFeature, setCountryFeature] = useState<Feature | undefined>(
    undefined
  );
  const [editingFeature, setEditingFeature] = useState(feature);

  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(OSM.isLoggedIn());
  }, []);

  useEffect(() => {
    (async () => {
      const country = await detectCountry(center[0], center[1]);
      setCountryFeature(country);
    })();
  }, [feature]);

  useEffect(() => {
    console.log(editingFeature.properties);
  }, [editingFeature]);

  const onReverseGeocode = useCallback(async () => {
    console.info("openReverseGeocoder", [center[0], center[1]]);
    const result = await openReverseGeocoder([center[0], center[1]]);
    console.info("openReverseGeocoder", result);

    setEditingFeature((prevFeature) => {
      const updateFields = {
        properties: {
          "addr:province": result.prefecture,
          "addr:city": result.city,
          ...prevFeature.properties,
        },
      };
      return { ...prevFeature, ...updateFields };
    });
  }, []);

  const onPostAddress = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setSubmitting(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const tags = JSON.parse(feature.properties?.tags);
      formData.forEach((value, key) => {
        if (typeof value === "string" && value.length > 0) {
          tags[key] = value;
        }
      });
      const changeSet = {
        type: "way",
        id: feature.id,
        version: feature.properties?.version,
        tags: tags,
        nodes: JSON.parse(feature.properties?.nodes),
      };
      console.info(JSON.stringify(changeSet, null, 2));
      const changes: OsmChange = {
        create: [],
        modify: [changeSet as OsmWay],
        delete: [],
      };
      await OSM.uploadChangeset(DEFAULT_TAGS, changes);
      setSubmitting(false);
      window.alert(
        "Successfully updated OpenStreetMap!!!\n Wait a minutes to apply to the map..."
      );
      onSubmit();
    },
    [feature]
  );

  return (
    <div>
      {editingFeature.properties && (
        <>
          <div>
            OSM:{" "}
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href={
                "https://www.openstreetmap.org/" + editingFeature.properties.id
              }
              target="_blank"
            >
              {editingFeature.properties.id}
            </a>
            {" | "}
            <CoordinatesTextView feature={editingFeature} />
            {countryFeature?.properties?.["ISO_A3"] === "JPN" && (
              <span>
                {" | "}
                Address:{" "}
                <span className="underline">
                  <AddressTextView feature={editingFeature} />
                </span>
              </span>
            )}
          </div>
          {countryFeature?.properties?.["ISO_A3"] === "JPN" ? (
            <form onSubmit={onPostAddress}>
              <div className="flex flex-wrap">
                <AddressInputField
                  feature={editingFeature}
                  fieldName={AddressPostcodeField.key}
                  label={AddressPostcodeField.displayName}
                  placeholder={AddressPostcodeField.placeholder}
                />
                {AddressMainFieldList.map((field) => {
                  return (
                    <AddressInputField
                      key={field.key}
                      feature={editingFeature}
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
                      key={field.key}
                      feature={editingFeature}
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
                    type="button"
                    onClick={onCancel}
                    className="button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onReverseGeocode}
                    className="button rounded mr-4 py-2 px-3 bg-green-300 text-gray-800 hover:text-white"
                  >
                    Load address from coordinates
                  </button>
                  <button
                    disabled={!loggedIn || submitting}
                    className="button rounded mr-2 py-2 px-3 bg-blue-300 text-gray-800 disabled:bg-blue-100 disabled:text-gray-400 hover:text-white"
                  >
                    Submit to OpenStreetMap!
                  </button>
                  {!loggedIn && (
                    <>
                      <span className="mr-2 underline text-red-600">
                        Require logged in before you submit data to
                        OpenStreetMap
                      </span>
                      <LoginButton />
                    </>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap">
              <div className="w-full mb-6 md:mb-0">
                <div className="py-2">
                  <p>
                    Sorry, Address editor in this country{" "}
                    {countryFeature?.properties?.["ABBREV"]} (ISO code:
                    {countryFeature?.properties?.["ISO_A3"]}) does not support
                    yet.
                  </p>
                  <p>
                    <a
                      href="https://github.com/yuiseki/osm-address-editor-vite"
                      target="_blank"
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      Pull requests are welcome!
                    </a>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCancel}
                  className="button rounded mr-4 py-2 px-3  bg-gray-200 text-red-600 hover:text-red-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
