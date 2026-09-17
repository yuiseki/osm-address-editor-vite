import React from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import "tailwindcss";
import App from "./App";

// maplibre-gl v6 locates its worker from import.meta.url, which a bundler
// cannot resolve on its own, so point it at the worker the bundler emits.
import { setWorkerUrl } from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(maplibreWorkerUrl);

// "buffer" alone resolves to jdenticon's ambient stub, so point at the polyfill itself
import { Buffer } from "buffer/index.js";
(window as any).Buffer = Buffer;

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
