import { LayerProps } from "react-map-gl";

export const BUILDINGS_FILL_STYLE: LayerProps = {
  id: "buildings-layer-fill",
  type: "fill",
  source: "buildings-source",
  paint: {
    "fill-color": [
      "case",
      ["boolean", ["feature-state", "select"], false],
      "green",
      // for JPN
      [
        "all",
        ["boolean", ["has", "addr:postcode"], false],
        ["boolean", ["has", "addr:province"], false],
        ["boolean", ["has", "addr:city"], false],
        ["boolean", ["has", "addr:quarter"], false],
        ["boolean", ["has", "addr:block_number"], false],
        ["boolean", ["has", "addr:housenumber"], false],
      ],
      "blue",
      // for CHN
      [
        "all",
        ["boolean", ["has", "addr:postcode"], false],
        ["boolean", ["has", "addr:province"], false],
        ["boolean", ["has", "addr:district"], false],
        ["boolean", ["has", "addr:street"], false],
        ["boolean", ["has", "addr:housenumber"], false],
      ],
      "blue",
      // for DEU
      [
        "all",
        ["boolean", ["has", "addr:postcode"], false],
        ["boolean", ["has", "addr:province"], false],
        ["boolean", ["has", "addr:district"], false],
        ["boolean", ["has", "addr:street"], false],
        ["boolean", ["has", "addr:housenumber"], false],
      ],
      "blue",
      // for KOR
      [
        "all",
        ["boolean", ["has", "addr:postcode"], false],
        ["boolean", ["has", "addr:city"], false],
        ["boolean", ["has", "addr:street"], false],
        ["boolean", ["has", "addr:housenumber"], false],
      ],
      "blue",
      // for all country
      [
        "any",
        ["boolean", ["has", "addr:postcode"], false],
        ["boolean", ["has", "addr:province"], false],
        ["boolean", ["has", "addr:city"], false],
        ["boolean", ["has", "addr:district"], false],
        ["boolean", ["has", "addr:suburb"], false],
        ["boolean", ["has", "addr:quarter"], false],
        ["boolean", ["has", "addr:street"], false],
        ["boolean", ["has", "addr:neighbourhood"], false],
        ["boolean", ["has", "addr:block_number"], false],
        ["boolean", ["has", "addr:housenumber"], false],
      ],
      "yellow",
      "red",
    ],
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "select"], false],
      0.8,
      ["boolean", ["feature-state", "hover"], false],
      0.8,
      0.4,
    ],
  },
  filter: ["==", "$type", "Polygon"],
};
