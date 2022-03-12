# osm-address-editor-vite

## What is this

This project aims to make editing addresses in OpenStreetMap fun and easy.

## How it works

The map is displayed in `react-map-gl` and `maplibre-gl-js`.  
When you move and zoom the map, fetch buildings information via the `Overpass API`.  
Then fetch the information of the user who last edited the building via `OpenStreetMap API v0.6`.

This project uses following apis and npm packages:

### API

- `Overpass API`
  - https://wiki.openstreetmap.org/wiki/Overpass_API
- `OpenStreetMap API v0.6`
  - https://wiki.openstreetmap.org/wiki/API_v0.6

### Library

- `react-map-gl` with `maplibre-gl-js`
  - https://github.com/visgl/react-map-gl
  - https://github.com/maplibre/maplibre-gl-js
- `osm-api-js`
  - https://github.com/k-yle/osm-api-js
  - A complete package for interacting with the OpenStreetMap API
- `osmtogeojson`
  - https://github.com/tyrasd/osmtogeojson
  - This package can convert responses from the Overpass API to GeoJson
- `turf`
  - https://github.com/Turfjs/turf
  - A powerful package that allows you to perform geospatial processing in Javascript

## Structure

- `/src`
  - `index.html`
    - Static HTML just load `main.tsx`
  - `main.tsx`
    - Script file just load `App.tsx`
  - `App.tsx`
    - Main entrypoint of this project
  - `/components`
    - Separable, Reusable UI components
  - `/lib`
    - Separable, Reusable libraries

## Development

### Requirements

- Node.js v16

### Launch dev server

```bash
npm ci
npm run dev
```

open `http://127.0.0.1:3000/osm-address-editor-vite/`
