import React, { useCallback, useEffect, useState } from "react";
import { MapboxGeoJSONFeature } from "react-map-gl";
import * as OSM from "osm-api";
import { OsmChange, OsmWay } from "osm-api";
import type { Feature } from "geojson";

import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";

import { LoginButton } from "../Header/LoggedInButton";
import { CoordinatesTextView } from "../Feature/CoordinatesTextView";

import {
  AddressFieldsByCountry,
  AddressStructureType,
} from "../Feature/address/fields";
import { useCountry } from "../../lib/hooks/country";
import { AddressInputField } from "./AddressInputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AddressTextViewByCountry } from "../Feature/AddressTextViewbyCountry";
import { CommentInputField } from "./CommentInputField";

const DEFAULT_TAGS = {
  host: "https://yuiseki.github.io/osm-address-editor-vite/",
  created_by: "osm-address-editor-vite",
  locale: navigator.language,
  comment: "Update Address",
};

export const AddressEditor: React.VFC<{
  feature: MapboxGeoJSONFeature;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ feature, onCancel, onSubmit }) => {
  const { detectCountry, loadingCountry } = useCountry();

  const center = JSON.parse(feature.properties?.center);
  const [countryFeature, setCountryFeature] = useState<Feature | undefined>(
    undefined
  );

  const [addressStructure, setAddressStructure] =
    useState<AddressStructureType>();

  const [editingFeature, setEditingFeature] = useState(feature);

  const [loggedIn, setLoggedIn] = useState(false);
  const [anyChange, setAnyChange] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [changesetCommentSuggest, setChangesetCommentSuggest] = useState<
    string | undefined
  >();

  useEffect(() => {
    setLoggedIn(OSM.isLoggedIn());
  }, []);

  useEffect(() => {
    (async () => {
      const country = await detectCountry(center[0], center[1]);
      setCountryFeature(country);
      if (
        country?.properties?.["ISO_A3"] &&
        AddressFieldsByCountry[country.properties["ISO_A3"]]
      ) {
        const fields = AddressFieldsByCountry[country.properties["ISO_A3"]];
        setAddressStructure(fields);
        const newCommentSuggest =
          fields.defaultComment + " " + feature.properties?.id;
        setChangesetCommentSuggest(newCommentSuggest);
      }
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
        if (
          typeof value === "string" &&
          value.length > 0 &&
          key !== "comment"
        ) {
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
      const comment = formData.get("comment");
      if (comment) {
        DEFAULT_TAGS["comment"] = comment.toString();
      }
      await OSM.uploadChangeset(DEFAULT_TAGS, changes);
      setSubmitting(false);
      window.alert(
        "Successfully updated OpenStreetMap!!!\n Wait a minutes to apply to the map..."
      );
      onSubmit();
    },
    [feature]
  );

  const onChange = useCallback(() => {
    setAnyChange(true);
  }, []);

  if (!editingFeature.properties) {
    return null;
  }

  return (
    <div>
      <div>
        OSM:{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href={"https://www.openstreetmap.org/" + editingFeature.properties.id}
          target="_blank"
        >
          {editingFeature.properties.id}
        </a>
        {" | "}
        <CoordinatesTextView feature={editingFeature} />
        {addressStructure && (
          <span>
            {" | "}
            Address:{" "}
            <AddressTextViewByCountry
              feature={editingFeature}
              fields={addressStructure}
            />
          </span>
        )}
      </div>
      {loadingCountry ? (
        <FontAwesomeIcon icon={faSpinner} spin={true} />
      ) : (
        <>
          {addressStructure ? (
            <form onSubmit={onPostAddress}>
              <div className="flex flex-wrap">
                <AddressInputField
                  feature={editingFeature}
                  fieldName={addressStructure.postcodeField.key}
                  label={addressStructure.postcodeField.displayName}
                  placeholder={addressStructure.postcodeField.placeholder}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-wrap">
                {addressStructure.mainFields.map((field) => {
                  return (
                    <AddressInputField
                      key={field.key}
                      feature={editingFeature}
                      fieldName={field.key}
                      label={field.displayName}
                      placeholder={field.placeholder}
                      onChange={onChange}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap">
                {addressStructure.detailFields.map((field) => {
                  return (
                    <AddressInputField
                      key={field.key}
                      feature={editingFeature}
                      fieldName={field.key}
                      label={field.displayName}
                      placeholder={field.placeholder}
                      onChange={onChange}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap">
                <CommentInputField defaultValue={changesetCommentSuggest} />
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
                  {countryFeature?.properties?.["ISO_A3"] === "JPN" && (
                    <button
                      type="button"
                      onClick={onReverseGeocode}
                      className="button rounded mr-4 py-2 px-3 bg-green-300 text-gray-800 hover:text-white"
                    >
                      Load address from coordinates
                    </button>
                  )}
                  <button
                    disabled={!loggedIn || submitting || !anyChange}
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
                    {countryFeature?.properties?.["NAME"]} (ISO code:
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
