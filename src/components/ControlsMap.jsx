"use client";
import "leaflet/dist/leaflet.css";

import React from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import controls from "./First_order.json";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import '../../public/images/marker-icon.png'
import 'leaflet/dist/leaflet.css'; // sass
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass
import MarkerClusterGroup from 'react-leaflet-markercluster';

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl

// Configure default Leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const cIcon = new L.Icon({
  iconUrl:'/images/marker-icon.png',
  iconSize:[10,16]
})

const ControlsMap = () => {
  console.log(controls)
  const setColor = () => {
    return { weight: 1, color: "red", background: "none" };
  };

  // Function to handle feature interaction and bind a popup to each polygon
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = Object.entries(feature.properties)
        .map(([key, value]) => `<b>${key}</b>: ${value}`)
        .join("<br/>");

      layer.bindPopup(popupContent); // Bind popup with feature properties
    }
  };

  return (
    <div className="top-4">
      <MapContainer
        style={{ height: "100vh", width: "100%", zIndex: 1 }}
        center={[-1.27, 36.7661]}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="OSM">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="ESRI">
            <TileLayer
              attribution='&copy;<a href="http://server.arcgisonline.com">ArcGIS</a>'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Hybrid">
            <TileLayer
              attribution='&copy;<a href="http://mt1.google.com">Google</a>'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Google Maps">
            <TileLayer
              attribution='&copy;<a href="http://mt1.google.com">Google</a>'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>

          {/* Add GeoJSON data with onEachFeature for popups */}
         <LayersControl.Overlay  checked name='georef'>
         <MarkerClusterGroup chunkedLoading>
            <GeoJSON
              data={controls}
              pointToLayer={(point,ll) => 
                new L.Marker(ll,{
                  icon:cIcon
                })
              }
              style={setColor}
              onEachFeature={onEachFeature}
            />
            </MarkerClusterGroup>
            
         </LayersControl.Overlay>
            
            
         
          
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default ControlsMap;
