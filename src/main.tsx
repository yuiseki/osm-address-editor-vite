import React from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import "tailwindcss/tailwind.css";
import App from "./App";

import * as buffer from "buffer";
(window as any).Buffer = buffer.Buffer;

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
