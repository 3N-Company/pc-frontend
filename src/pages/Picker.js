import React, { Fragment, useDispatchMap, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
const mapboxApiKey =
  "pk.eyJ1Ijoic2llcmlrb3YiLCJhIjoiY2t2MmhqdnNsM3liYzJuczdwcHB5eWZ6ZCJ9.E_DlDzsVz3WFStxFQhILSw";
const mapStyle =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function Picker() {
  const [tempMarker, setTempMarker] = useState({
    isSet: false,
    lon: 0,
    lat: 0,
  });
  const [mapViewport, setMapViewport] = useState({
    longitude: 13.7373,
    latitude: 51.0504,
    zoom: 9.6,
    maxZoom: 16,
    height: "100vh",
    width: "100wh",
  });

  const placeTempMarker = (longitude, latitude) => {
    setTempMarker((prevState) => ({
      ...prevState,
      isSet: true,
      lon: longitude,
      lat: latitude,
    }));
  };

  return (
    <ReactMapGL
      {...mapViewport}
      mapboxApiAccessToken={mapboxApiKey}
      mapStyle={mapStyle}
      onViewportChange={setMapViewport}
      onClick={(x) => {
        placeTempMarker(x.lngLat[0], x.lngLat[1]);
      }}
    >
      {tempMarker.isSet == true && (
        <Marker
          offsetTop={-48}
          offsetLeft={-24}
          latitude={tempMarker.lat}
          longitude={tempMarker.lon}
        >
          <img src="https://img.icons8.com/color/48/000000/marker.png" />
        </Marker>
      )}
    </ReactMapGL>
  );
}
