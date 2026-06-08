import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "Andhra Pradesh", coordinates: [79.74, 15.91] },
];

export default function WorldMap() {
  return (
    <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-[500px] md:h-[800px] overflow-hidden mb-12 flex flex-col md:flex-row items-center border-t border-b border-white/5 bg-[#111]">
      
      {/* Absolute Header Content */}
      <div className="absolute top-0 left-4 md:left-12 lg:left-24 z-10 pointer-events-none max-w-2xl px-4 md:px-0">
         <h3 className="text-4xl md:text-6xl lg:text-[72px] font-black font-display uppercase tracking-tight text-white leading-[1.0] mb-6 mt-8 md:mt-12">
           RE-DEFINING <br />
           <span className="text-nomad-green">LIVE EVENTS</span> <br />
           WORLD-WIDE.
         </h3>
         <p className="text-white/60 text-[15px] md:text-lg font-medium max-w-2xl">
           Built in India, For the world! We're looking to connect nomads across 50+ countries.
         </p>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center -z-0">
        <ComposableMap 
          projection="geoMercator" 
          width={1200}
          height={600}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
          preserveAspectRatio="xMidYMid slice"
          projectionConfig={{
            scale: 180,
            center: [10, 30]
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties.name === "India";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isIndia ? "#00FF66" : "#2a2a2a"}
                    stroke="#1a1a1a"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "fill 0.2s" },
                      hover: { fill: isIndia ? "#33FF88" : "#5a5a5a", outline: "none", cursor: "pointer", transition: "fill 0.2s" },
                      pressed: { fill: isIndia ? "#00CC55" : "#4a4a4a", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker 
              key={name} 
              coordinates={coordinates as any} 
              className="pointer-events-none"
            >
              <circle r={8} fill="#00FF66" stroke="#1a1a1a" strokeWidth={2} />
              <circle r={18} fill="#00FF66" opacity={0.3} className="animate-ping" />
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
}
