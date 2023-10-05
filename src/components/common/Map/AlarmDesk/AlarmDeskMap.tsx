import { FC, useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { PageLoader } from "@vilocnv/allsetra-core";
import { MapContainer } from "../Map.styled";
import Markers from "./children/Markers";
import { useGoogleMapsLoader } from "app/data/helpers/mapHelpers";

interface AlarmDeskMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  objects: Array<any>;
}

const AlarmDeskMap: FC<AlarmDeskMapProps> = ({ center, zoom, objects }) => {
  const [shouldRenderMarkers, setShouldRenderMarkers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const { isLoaded, loadError } = useGoogleMapsLoader();

  useEffect(() => {
    if (objects.length > 0) {
      setShouldRenderMarkers(true);
    }
  }, [objects]);

  const handleMarkerClick = (markerIndex: number) => {
    setSelectedMarker(markerIndex);
  };

  const renderMap = () => {
    return (
      <MapContainer>
        <GoogleMap
          center={center}
          zoom={zoom}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
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

export default AlarmDeskMap;
