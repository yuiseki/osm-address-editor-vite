export const OSM_RASTER_TILE_STYLE: mapboxgl.Style = {
  version: 8,
  sources: {
    "osm-raster-tiles": {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm-raster-tiles",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};
