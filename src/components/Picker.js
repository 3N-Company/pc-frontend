import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker, Layer, Source } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const mapboxApiKey =
  "pk.eyJ1Ijoic2llcmlrb3YiLCJhIjoiY2t2MmhqdnNsM3liYzJuczdwcHB5eWZ6ZCJ9.E_DlDzsVz3WFStxFQhILSw";
const mapStyle = "mapbox://styles/mapbox/light-v10";

export default function Picker({ onPickerSet, zoom, height, oldMap }) {
  const mapRef = useRef();
  const [tempMarker, setTempMarker] = useState({
    isSet: false,
    lon: 0,
    lat: 0,
  });

  const [mapViewport, setMapViewport] = useState({
    longitude: 13.7373,
    latitude: 51.0504,
    zoom: zoom,
    maxZoom: 16,
    height: height,
    width: "100wh",
  });

  // eslint-disable-next-line
  const placeTempMarker = (longitude, latitude, set) => {
    setTempMarker((prevState) => ({
      ...prevState,
      isSet: set,
      lon: longitude,
      lat: latitude,
    }));
    onPickerSet({
      isSet: true,
      lon: longitude,
      lat: latitude,
    });
  };

  const handleViewportChange = useCallback(
    (newViewport) => {
      setMapViewport(newViewport);
      console.log(newViewport);
      placeTempMarker(newViewport.longitude, newViewport.latitude, true);
    },
    [placeTempMarker]
  );

  return (
    <ReactMapGL
      ref={mapRef}
      {...mapViewport}
      mapboxApiAccessToken={mapboxApiKey}
      mapStyle={mapStyle}
      onViewportChange={setMapViewport}
      onClick={(x) => {
        console.log("Classlist:", x.target.classList);
        if (
          Array.from(x.target.classList.values()).filter((cl) =>
            cl.includes("mapboxgl-ctrl-geocoder")
          ).length === 0
        ) {
          placeTempMarker(x.lngLat[0], x.lngLat[1], true);
        }
      }}
    >
      {tempMarker.isSet === true && (
        <Marker
          offsetTop={-48}
          offsetLeft={-24}
          latitude={tempMarker.lat}
          longitude={tempMarker.lon}
        >
          <img src="https://img.icons8.com/color/48/000000/marker.png" alt="" />
        </Marker>
      )}
      <Geocoder
        mapRef={mapRef}
        mapboxApiAccessToken={mapboxApiKey}
        onViewportChange={handleViewportChange}
        countries={"DE"}
        position="top-right"
      />

      <Source
        id="geo-data-1945"
        type="raster"
        tiles={[
          "https://geodienste.sachsen.de/wms_geosn_hist/guest?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES=default&VERSION=1.3.0&LAYERS=messtischblatt_vor_1945&WIDTH=1024&HEIGHT=1024&CRS=EPSG:3857&BBOX={bbox-epsg-3857}",
        ]}
      >
        <Layer
          type="raster"
          source="geo-data-1945"
          layout={{ visibility: oldMap ? "visible" : "none" }}
        />
      </Source>
    </ReactMapGL>
  );
}

Picker.defaultProps = {
  onPickerSet: () => console.warn("SET onPicker"),
  zoom: 12,
  height: "300px",
};
