import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { MapContainer } from "./Map.styled";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  radius: number; // Specify the radius around the center for random placement
  objects: Array<any>;
}

const Map: React.FC<MapProps> = ({ center, zoom, objects }) => {
  return (
    <MapContainer>
      <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={zoom}
        ></GoogleMap>
      </LoadScript>
    </MapContainer>
  );
};

export default Map;
