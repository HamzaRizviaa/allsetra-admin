import React from "react";
import { OverlayView, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { MarkerLabel } from "../Map.styled";
import { MapObjectCard } from "@vilocnv/allsetra-core";

interface MarkerProps {
  objects: any[];
  selectedMarker: number | null;
  handleMarkerClick: (markerIndex: any) => void;
}

const Markers: React.FC<MarkerProps> = ({
  objects,
  selectedMarker,
  handleMarkerClick,
}) => {
  return (
    <>
      {objects.map((object: any, index: any) => {
        const position = {
          lat: object.location.latitude,
          lng: object.location.longitude,
        };

        const iconUrl = `${process.env.REACT_APP_API_BASE_URL}/icons/${object.objectType.icon.uniqueId}/file?X-Subscription=${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`;

        const originalDate = new Date(object.location.date);
        const formattedDate = originalDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return (
          <React.Fragment key={index}>
            <MarkerF
              position={position}
              icon={{
                url: iconUrl,
                scaledSize: new window.google.maps.Size(28, 28),
              }}
              onClick={() => handleMarkerClick(index)}
            >
              {selectedMarker === index && (
                <InfoWindowF onCloseClick={() => handleMarkerClick(null)}>
                  <MapObjectCard
                    objectIcon={iconUrl}
                    label={object.name}
                    id={object.aNumber}
                    address="Lorem ipsum dolor"
                    accuracy={object.location.accuracy}
                    info="Lorem ipsum"
                    status="Lorem"
                    speed={0}
                    time={formattedDate}
                  />
                </InfoWindowF>
              )}
            </MarkerF>
            <OverlayView
              position={position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <MarkerLabel>{object.name}</MarkerLabel>
            </OverlayView>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Markers;
