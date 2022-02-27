import { useCallback, useEffect, useRef, useState } from "react";

import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Layer,
  LayerProps,
  MapboxEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import type { FeatureCollection, GeometryObject } from "geojson";
import osmtogeojson from "osmtogeojson";

import { Header } from "./components/Header";

const layerStyle: LayerProps = {
  id: "park-boundary",
  type: "fill",
  source: "national-park",
  paint: {
    "fill-color": "pink",
    "fill-opacity": 0.4,
  },
  filter: ["==", "$type", "Polygon"],
};

function App() {
  const [viewState, setViewState] = useState({});
  const geolocateControlRef = useRef<GeolocateControlRef>(null);
  const [geojson, setGeojson] = useState<FeatureCollection<GeometryObject>>({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    setTimeout(() => {
      console.log(window.location.hash);
      if (window.location.hash.endsWith("/0/0")) {
        console.log("geolocateControlRef trigger");
        geolocateControlRef.current?.trigger();
      }
    }, 1000);
  }, []);

  const onIdleMap = useCallback(
    (e: MapboxEvent) => {
      const center = e.target.getCenter();
      (async () => {
        console.log("overpass: loading...");
        const query = `[out:json][timeout:25];way["building"="yes"](around:${150},${
          center.lat
        },${center.lng});out meta geom;`;
        const res = await fetch(
          `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(
            query
          )}`,
          {}
        );
        const json = await res.json();
        console.log(json);

        console.log("overpass: ", json.elements);
        console.log("overpass: ", osmtogeojson(json));
        setGeojson(osmtogeojson(json) as FeatureCollection<GeometryObject>);
      })();
    },
    [viewState]
  );

  const onMoveMap = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  }, []);

  const onMoveEndMap = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Map
          {...viewState}
          onIdle={onIdleMap}
          onMove={onMoveMap}
          onMoveEnd={onMoveEndMap}
          mapLib={maplibregl}
          hash={true}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://raw.githubusercontent.com/geoloniamaps/basic/gh-pages/style.json"
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          <GeolocateControl
            ref={geolocateControlRef}
            showUserLocation={true}
            showAccuracyCircle={false}
            trackUserLocation={true}
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ zoom: 17 }}
            position="bottom-right"
          />
        </Map>
      </div>
    </div>
  );
}

export default App;
