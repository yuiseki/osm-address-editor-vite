import React from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import "tailwindcss";
import App from "./App";

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
