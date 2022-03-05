# osm-address-editor-vite

## What is this

This project aims to make entering addresses in OpenStreetMap fun and easy.

## How it works

The map is displayed in react-map-gl and maplibre-gl.  
When you move the map, the Overpass API gets the building information.  
Get the information of the user who last edited the building via OpenStreetMap API.

This project uses following apis and npm packages:

### API

- OpenStreetMap API v0.6
  - https://wiki.openstreetmap.org/wiki/API_v0.6
- Overpass API
  - https://wiki.openstreetmap.org/wiki/Overpass_API

### Library

- `react-map-gl` with `maplibre-gl`
- `osm-api`
  - A complete package for interacting with the OpenStreetMap API
- `osmtogeojson`
  - This package can convert responses from the Overpass API to GeoJson
- `turf`
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
