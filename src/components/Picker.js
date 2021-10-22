import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const mapboxApiKey =
  "pk.eyJ1Ijoic2llcmlrb3YiLCJhIjoiY2t2MmhqdnNsM3liYzJuczdwcHB5eWZ6ZCJ9.E_DlDzsVz3WFStxFQhILSw";
const mapStyle =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function Picker({ onPickerSet, zoom, height }) {
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
      placeTempMarker(newViewport.longitude, newViewport.latitude, false);
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
        placeTempMarker(x.lngLat[0], x.lngLat[1], true);
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
    </ReactMapGL>
  );
}

Picker.defaultProps = {
  onPickerSet: () => console.warn("SET onPicker"),
  zoom: 12,
  height: "300px",
};
