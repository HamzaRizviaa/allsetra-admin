import { FC, Fragment } from "react";
import { isEmpty } from "lodash";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { MapAlarmCard, types } from "@vilocnv/allsetra-core";
import AlarmIcon from "assets/icons/common/AlarmIcon.png";

interface MarkerProps {
  objects: types.IAlarm[];
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
      {objects.map((alarmObject: types.IAlarm, index: number) => {
        if (isEmpty(alarmObject?.location)) return null;

        const alarmPosition = {
          lat: alarmObject.location.latitude,
          lng: alarmObject.location.longitude,
        };

        const objectPosition = {
          lat: alarmObject.object.location.latitude,
          lng: alarmObject.object.location.longitude,
        };

        const iconPath = alarmObject?.object.objectType?.icon?.uniqueId;
        const objectIconUrl = `${process.env.REACT_APP_API_BASE_URL}/icons/${iconPath}/file?X-Subscription=${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`;

        const renderAlarm = () => {
          return (
            <MarkerF
              position={alarmPosition}
              icon={{
                url: AlarmIcon,
                scaledSize: new window.google.maps.Size(28, 28),
              }}
              onClick={() => handleMarkerClick(index)}
            >
              {selectedMarker === index && (
                <InfoWindowF onCloseClick={() => handleMarkerClick(null)}>
                  <MapAlarmCard
                    objectIcon={objectIconUrl}
                    name={alarmObject.object.name}
                    aNumber={alarmObject.aNumber}
                    alarmType={alarmObject.alarmType}
                    hasImmobilizer={alarmObject.hasImmobilizer}
                    ignitionStatus={alarmObject.ignitionStatus}
                    lastBatteryStatus={alarmObject.lastBatteryStatus}
                  />
                </InfoWindowF>
              )}
            </MarkerF>
          );
        };

        const renderObject = () => {
          return (
            <MarkerF
              position={objectPosition}
              icon={
                objectIconUrl
                  ? {
                      url: objectIconUrl,
                      scaledSize: new window.google.maps.Size(28, 28),
                    }
                  : undefined
              }
              onClick={() => handleMarkerClick(index)}
            ></MarkerF>
          );
        };

        return (
          <Fragment key={index}>
            {renderAlarm()}
            {renderObject()}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Markers;
