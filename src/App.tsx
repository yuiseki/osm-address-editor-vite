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

import { OSMQuery } from "@toriyama/osmql";
import type { FeatureCollection } from "geojson";
import * as osmtogeojson from "osmtogeojson";

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
  const [geojson, setGeojson] = useState<FeatureCollection>({
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
        const osmQuery = new OSMQuery();
        const query = osmQuery.fromQLString(
          `way["building"="yes"](around:${150},${center.lat},${
            center.lng
          });out meta geom;`
        );
        const result = await query.execute();
        console.log("overpass: ", result.data.elements);
        console.log("overpass: ", osmtogeojson(result.data));
        setGeojson(osmtogeojson(result.data) as FeatureCollection);
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
            showUserLocation={false}
            showAccuracyCircle={false}
            trackUserLocation={false}
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ zoom: 19 }}
            position="bottom-right"
          />
        </Map>
      </div>
    </div>
  );
}

export default App;
