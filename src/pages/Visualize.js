import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import customData from "../assets/example-heat.json";
import customData2 from "../assets/submission.json";

// Source data CSV
//const DATA_URL =
//  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: 13.7373,
  latitude: 51.0504,
  zoom: 9.6,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function Visualize({
  data = customData2,
  data2 = customData,
  intensity = 1,
  threshold = 0.03,
  radiusPixels = 15,
  mapStyle = MAP_STYLE,
}) {
  const layers = [
    new HeatmapLayer({
      data: customData,
      id: "heatmp-layer",
      pickable: true,
      getPosition: (d) => [d[0], d[1]],
      getWeight: (d) => d[2],
      aggregation: "SUM",
      colorRange: [
        [255, 158, 0],
        [255, 145, 0],
        [255, 133, 0],
        [255, 121, 0],
        [255, 109, 0],
      ],
      radiusPixels,
      intensity,
      threshold,
    }),
    new HeatmapLayer({
      data: customData2,
      id: "heatmp-layer1",
      aggregation: "SUM",
      colorRange: [
        [157, 78, 221],
        [123, 44, 191],
        [90, 24, 154],
        [60, 9, 108],
        [36, 0, 70],
      ],
      pickable: false,
      getPosition: (d) => [d[0], d[1]],
      getWeight: (d) => d[2],
      radiusPixels,
      intensity,
      threshold,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoic2llcmlrb3YiLCJhIjoiY2t2MmhqdnNsM3liYzJuczdwcHB5eWZ6ZCJ9.E_DlDzsVz3WFStxFQhILSw"
        }
      />
    </DeckGL>
  );
}
