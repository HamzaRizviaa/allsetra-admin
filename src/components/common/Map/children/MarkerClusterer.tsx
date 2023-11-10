import React, { useEffect, useState } from "react";
import {
  MarkerClustererF,
  MarkerF,
  OverlayViewF,
  OverlayView,
  InfoWindowF,
} from "@react-google-maps/api";
import { MapObjectCard } from "@vilocnv/allsetra-core";
import { MarkerBlip, MarkerLabel } from "../Map.styled";

interface CustomMarkerClustererProps {
  markers: Array<any>;
  handleMarkerClick: (marker: any) => void;
  map: any;
  selectedMarker: any;
}

const MarkerClusterer: React.FC<CustomMarkerClustererProps> = ({
  markers,
  handleMarkerClick,
  map,
  selectedMarker,
}) => {
  const [visibleMarkers, setVisibleMarkers] = useState(markers);

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  function createKey(location: any) {
    return location.lat + location.lng;
  }

  const getPixelPositionOffset = () => ({
    x: 20,
    y: -29,
  });

  useEffect(() => {
    if (map) {
      const updateVisibleMarkers = () => {
        let newVisibleMarkers = markers;
        let mapBounds = map.getBounds();

        if (map.zoom > 13) {
          newVisibleMarkers = markers.filter((marker) => {
            return mapBounds.contains(
              new window.google.maps.LatLng(marker.lat, marker.lng)
            );
          });
        }
        setVisibleMarkers(newVisibleMarkers);
      };

      window.google.maps.event.addListener(map, "idle", updateVisibleMarkers);

      updateVisibleMarkers();
    }
  }, [map, markers]);

  return (
    <MarkerClustererF options={options} minimumClusterSize={5}>
      {(clusterer) => (
        <>
          {visibleMarkers.map((marker) => (
            <>
              <MarkerF
                key={createKey(marker)}
                position={{ lat: marker.lat, lng: marker.lng }}
                clusterer={clusterer}
                onClick={() => handleMarkerClick(marker.uniqueId)}
                icon={
                  marker.iconUrl
                    ? {
                        url: marker.iconUrl,
                        scaledSize: new window.google.maps.Size(28, 28),
                      }
                    : undefined
                }
              >
                {selectedMarker === marker.uniqueId && (
                  <InfoWindowF
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onCloseClick={() => handleMarkerClick(null)}
                  >
                    <MapObjectCard
                      label={marker.name || "N/A"}
                      id={marker.aNumber || "N/A"}
                      address={marker.resolvedAddress ?? "N/A"}
                      accuracy={marker.accuracy ?? "N/A"}
                      info="N/A"
                      status="N/A"
                      speed={marker.lastReportedSpeed ?? "N/A"}
                      time={marker.formattedDate}
                    />
                  </InfoWindowF>
                )}
              </MarkerF>
              {map.zoom > 14 && (
                <OverlayViewF
                  position={{ lat: marker.lat, lng: marker.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <MarkerLabel>{marker.name || "N/A"}</MarkerLabel>
                  <MarkerBlip></MarkerBlip>
                </OverlayViewF>
              )}
            </>
          ))}
        </>
      )}
    </MarkerClustererF>
  );
};

export default MarkerClusterer;
