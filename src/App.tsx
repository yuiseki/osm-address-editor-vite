import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Layer,
  LayerProps,
  MapboxEvent,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent,
  Marker,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import type { FeatureCollection, GeometryObject } from "geojson";

import { Header } from "./components/Header";
import { useOverpass } from "./lib/hooks/overpass";

import { toSvg } from "jdenticon";

const layerStyleFill: LayerProps = {
  id: "buildings-layer-fill",
  type: "fill",
  source: "buildings-source",
  paint: {
    "fill-color": "pink",
    "fill-opacity": 0.4,
  },
  filter: ["==", "$type", "Polygon"],
};

const layerStyleIcon: LayerProps = {
  id: "buildings-layer-icon",
  type: "symbol",
  source: "buildings-source",
  layout: {
    "icon-image": [
      "coalesce",
      ["image", ["get", "userIconHref"]],
      ["image", "fallbackImage"],
    ],
  },
};

function App() {
  const [viewState, setViewState] = useState({});
  const geolocateControlRef = useRef<GeolocateControlRef>(null);
  const [geojson, setGeojson] = useState<FeatureCollection<GeometryObject>>({
    type: "FeatureCollection",
    features: [],
  });

  const [cursor, setCursor] = useState<string>("auto");
  const [hoverInfo, setHoverInfo] = useState<
    { x: number; y: number; feature: MapboxGeoJSONFeature } | undefined
  >();

  const [loadingOverpass, setLoadingOverpass] = useState(false);
  const { fetchOverpass } = useOverpass();

  // initial load
  useEffect(() => {
    setTimeout(() => {
      console.log(window.location.hash);
      if (window.location.hash.endsWith("/0/0")) {
        console.log("geolocateControlRef trigger");
        geolocateControlRef.current?.trigger();
      }
    }, 500);
  }, []);

  // map event
  const onLoadMap = useCallback((e: MapboxEvent) => {
    const center = e.target.getCenter();
    (async () => {
      if (!loadingOverpass) {
        setLoadingOverpass(true);
        const newGeojson = await fetchOverpass(center.lat, center.lng);
        setGeojson(newGeojson);
        setLoadingOverpass(false);
      }
    })();
  }, []);
  const onMoveMap = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  }, []);
  const onMoveEndMap = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
    const center = e.viewState;
    (async () => {
      if (!loadingOverpass) {
        setLoadingOverpass(true);
        const newGeojson = await fetchOverpass(
          center.latitude,
          center.longitude
        );
        setGeojson(newGeojson);
        setLoadingOverpass(false);
      }
    })();
  }, []);

  // mouse event
  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);
  const onMouseMove = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      setHoverInfo({ feature: hoveredFeature, x, y });
    } else {
      setHoverInfo(undefined);
    }
  }, []);
  const onClick = useCallback((event) => {
    const clickedFeature = event.features && event.features[0];
    window.alert(JSON.stringify(clickedFeature, null, 2));
  }, []);

  const pins = useMemo(() => {
    return geojson.features.map((feature, i) => {
      if (!feature.properties) {
        return null;
      } else {
        return (
          <Marker
            key={`marker-${i}`}
            longitude={feature.properties.center[0]}
            latitude={feature.properties.center[1]}
            anchor="bottom"
          >
            {feature.properties.userIconHref.length > 0 ? (
              <img
                src={feature.properties.userIconHref}
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: toSvg(feature.properties.user || "noname", 30),
                }}
              />
            )}
          </Marker>
        );
      }
    });
  }, [geojson]);

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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "5px",
            height: "5px",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Map
          {...viewState}
          onMove={onMoveMap}
          onMoveEnd={onMoveEndMap}
          onLoad={onLoadMap}
          interactiveLayerIds={["buildings-layer-fill"]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          cursor={cursor}
          mapLib={maplibregl}
          hash={true}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://raw.githubusercontent.com/geoloniamaps/basic/gh-pages/style.json"
        >
          <Source id="buildings-source" type="geojson" data={geojson}>
            <Layer {...layerStyleFill} />
            <Layer {...layerStyleIcon} />
          </Source>
          {pins}
          {hoverInfo && (
            <div
              className="tooltip"
              style={{
                zIndex: 10,
                background: "rgba(255, 255, 255, 0.7)",
                padding: "5px",
                width: "250px",
                position: "absolute",
                left: hoverInfo.x + 5,
                top: hoverInfo.y + 5,
              }}
            >
              <pre>{JSON.stringify(hoverInfo.feature.properties, null, 2)}</pre>
            </div>
          )}
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
