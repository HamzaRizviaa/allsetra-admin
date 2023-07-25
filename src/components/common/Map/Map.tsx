import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { PageLoader, types } from "@vilocnv/allsetra-core";
import { MapContainer } from "./Map.styled";
import Markers from "../Map/children/Markers";
import Geozone from "../Map/children/Geozone";
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  radius: number; // Specify the radius around the center for random placement
  objects: Array<any>;
  geozone: Array<any>;
}

const Map: React.FC<MapProps> = ({
  center,
  zoom,
  objects,
  geozone,
  radius,
}) => {
  const [shouldRenderMarkers, setShouldRenderMarkers] = useState(false);
  const [shouldRenderGeozone, setShouldRenderGeozone] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
  });

  useEffect(() => {
    if (objects.length > 0) {
      setShouldRenderMarkers(true);
    }
    if (geozone.length > 0) {
      setShouldRenderGeozone(true);
    }
  }, [objects, geozone]);

  const handleMarkerClick = (markerIndex: number) => {
    setSelectedMarker(markerIndex);
  };

  const renderMap = () => {
    return (
      <MapContainer>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={zoom}
        >
          {shouldRenderGeozone && <Geozone geozone={geozone} radius={radius} />}
          {shouldRenderMarkers && (
            <Markers
              objects={objects}
              selectedMarker={selectedMarker}
              handleMarkerClick={handleMarkerClick}
            />
          )}
        </GoogleMap>
      </MapContainer>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <PageLoader />;
};

export default Map;
