import { FC, Fragment } from "react";
import { isEmpty } from "lodash";
import {
  OverlayView,
  InfoWindowF,
  MarkerF,
  OverlayViewF,
} from "@react-google-maps/api";
import { MapObjectCard, types } from "@vilocnv/allsetra-core";
import { MarkerBlip, MarkerLabel } from "../Map.styled";

interface MarkerProps {
  objects: types.IObject[];
  selectedMarker: number | null;
  handleMarkerClick: (markerIndex: any) => void;
}

const Markers: FC<MarkerProps> = ({
  objects,
  selectedMarker,
  handleMarkerClick,
}) => {
  return (
    <Fragment>
      {objects.map((object: types.IObject, index: number) => {
        if (isEmpty(object.location)) return null;

        const position = {
          lat: object.location.latitude,
          lng: object.location.longitude,
        };

        const hasAlarmType = object.hasOwnProperty("alarmType");

        const iconUrl = !hasAlarmType
          ? `${process.env.REACT_APP_API_BASE_URL}/icons/${object.objectType.icon.uniqueId}/file?X-Subscription=${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`
          : "";

        const originalDate = new Date(object.location.date);
        const formattedDate = originalDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const getPixelPositionOffset = () => ({
          x: 20,
          y: -29,
        });

        return (
          <Fragment key={index}>
            <MarkerF
              position={position}
              icon={
                iconUrl
                  ? {
                      url: iconUrl,
                      scaledSize: new window.google.maps.Size(28, 28),
                    }
                  : undefined
              }
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
            <OverlayViewF
              position={position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <MarkerLabel>{object.name}</MarkerLabel>
              <MarkerBlip></MarkerBlip>
            </OverlayViewF>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Markers;
