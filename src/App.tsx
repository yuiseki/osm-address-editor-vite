import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// map
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
  GeolocateControl,
  GeolocateControlRef,
  Layer,
  LayerProps,
  MapboxEvent,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  Point,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";

import type { FeatureCollection, GeometryObject } from "geojson";

// appearance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toSvg } from "jdenticon";

// components
import { Header } from "./components/Header";
// libs
import { useOverpass } from "./lib/hooks/overpass";

const layerStyleFill: LayerProps = {
  id: "buildings-layer-fill",
  type: "fill",
  source: "buildings-source",
  paint: {
    "fill-color": [
      "case",
      ["boolean", ["feature-state", "select"], false],
      "green",
      ["boolean", ["has", "addr:province"], false],
      "blue",
      "pink",
    ],
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "select"], false],
      0.8,
      ["boolean", ["feature-state", "hover"], false],
      0.8,
      0.4,
    ],
  },
  filter: ["==", "$type", "Polygon"],
};

function App() {
  const mapRef = useRef<MapRef>(null);
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
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>();
  const [dragEnd, setDragEnd] = useState<Point>();

  const [loadingOverpass, setLoadingOverpass] = useState<boolean>();
  const { fetchOverpass } = useOverpass();

  //
  // initial load
  //
  useEffect(() => {
    setTimeout(() => {
      console.log(window.location.hash);
      if (window.location.hash.endsWith("/0/0")) {
        console.log("geolocateControlRef trigger");
        geolocateControlRef.current?.trigger();
      }
    }, 500);
  }, []);

  //
  // map event
  //
  const onMapLoad = useCallback(async (e: MapboxEvent) => {
    const center = e.target.getCenter();
    setLoadingOverpass(true);
    const newGeojson = await fetchOverpass(center.lat, center.lng);
    setGeojson(newGeojson);
    setLoadingOverpass(false);
  }, []);

  const onMapMove = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  }, []);

  const onMapMoveEnd = useCallback(async (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
    const center = e.viewState;
    if (!loadingOverpass) {
      setLoadingOverpass(true);
      const newGeojson = await fetchOverpass(center.latitude, center.longitude);
      setGeojson(newGeojson);
      setLoadingOverpass(false);
    }
  }, []);

  //
  // mouse event
  //
  const onMouseEnter = useCallback((e: MapLayerMouseEvent) => {
    setCursor("pointer");
    const {
      features,
      point: { x, y },
    } = e;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      mapRef.current?.setFeatureState(
        { source: "buildings-source", id: hoveredFeature.id },
        { hover: true }
      );
      setHoverInfo({ feature: hoveredFeature, x, y });
    } else {
      setHoverInfo(undefined);
    }
  }, []);

  const onMouseLeave = useCallback((e: MapLayerMouseEvent) => {
    setCursor("auto");
    const { features } = e;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      mapRef.current?.setFeatureState(
        { source: "buildings-source", id: hoveredFeature.id },
        { hover: false }
      );
    }
    setHoverInfo(undefined);
  }, []);

  const onMouseDown = useCallback((e: MapLayerMouseEvent) => {
    console.log("onMouseDown", e.point);
    if (!e.originalEvent.shiftKey) {
      return;
    }
    if (e.originalEvent.button !== 0) {
      return;
    }
    setDragging(true);
    setDragStart(e.point);
  }, []);

  const onMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      if (!dragging) {
        return;
      }
      setDragEnd(e.point);
    },
    [dragging]
  );

  const onMouseUp = useCallback((e: MapLayerMouseEvent) => {
    console.log("onMouseUp", e.point);
    setDragEnd(e.point);
    setDragging(false);
  }, []);

  const onClick = useCallback((event) => {
    const clickedFeature = event.features && event.features[0];
    if (!clickedFeature) {
      return;
    }
    mapRef.current?.setFeatureState(
      { source: "buildings-source", id: clickedFeature.id },
      { select: true }
    );
    /*
    const osmurl =
      "https://www.openstreetmap.org/" + clickedFeature.properties.id;
    window.open(osmurl, "_blank")?.focus();
    */
  }, []);

  //
  // selecting
  //
  useEffect(() => {
    if (dragging) {
      return;
    }
    console.log("drag select: ", dragging, dragStart, dragEnd);
  }, [dragging, dragStart, dragEnd]);

  //
  // icons
  //
  const pins = useMemo(() => {
    return geojson.features.map((feature, i) => {
      if (!feature.properties) {
        return null;
      } else {
        return (
          <Marker
            key={`marker-${i}`}
            style={{ cursor: "pointer" }}
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
          display: "flex",
        }}
      >
        <Map
          ref={mapRef}
          {...viewState}
          onMove={onMapMove}
          onMoveEnd={onMapMoveEnd}
          onLoad={onMapLoad}
          interactiveLayerIds={["buildings-layer-fill"]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          //dragPan={false}
          dragRotate={false}
          boxZoom={false}
          hash={true}
          cursor={cursor}
          mapLib={maplibregl}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://raw.githubusercontent.com/geoloniamaps/basic/gh-pages/style.json"
        >
          <div
            className="fa-2xl"
            style={{
              zIndex: 100,
              display: "flex",
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            {loadingOverpass ? (
              <FontAwesomeIcon size="2x" spin={true} icon={faSpinner} />
            ) : (
              <FontAwesomeIcon size="2x" icon={faXmark} />
            )}
          </div>
          <Source id="buildings-source" type="geojson" data={geojson}>
            <Layer {...layerStyleFill} />
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
            position="top-left"
            style={{ marginTop: "55px" }}
            showUserLocation={true}
            showAccuracyCircle={false}
            trackUserLocation={false}
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ zoom: 17 }}
          />
        </Map>
      </div>
    </div>
  );
}

export default App;
