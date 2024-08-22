import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import db from "./db.js";
import { scaleQuantize } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <div className="#niggas">

      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find((s) => s.id === geo.id);
              return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#ccc"
                    style={{
                      hover: {
                        fill: "#ddd",
                      },
                      pressed: {
                        fill: "#E42",
                      },
                    }}
                    fill={colorScale(cur?.val) || "#ffedea"}
                  />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
