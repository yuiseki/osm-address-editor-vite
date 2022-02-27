import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/osm-address-editor-vite/",
  resolve: {
    alias: {
      "mapbox-gl": "maplibre-gl",
    },
  },
  plugins: [react()],
});
