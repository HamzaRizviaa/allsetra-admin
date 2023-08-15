import { FC } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { DeviceDetailsMapContainer } from "../DeviceDetailsBody.styled";
import { IDevices } from "app/data/types";

interface Props {
  specificDevice: IDevices | null;
}

const DeviceDetailsMap: FC<Props> = ({ specificDevice }) => {
  return (
    <DeviceDetailsMapContainer>
      <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={{
            lat: specificDevice?.object?.location?.latitude || 0,
            lng: specificDevice?.object?.location?.longitude || 0,
          }}
          zoom={4}
        >
          <MarkerF
            position={{
              lat: specificDevice?.object?.location?.latitude || 0,
              lng: specificDevice?.object?.location?.longitude || 0,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </DeviceDetailsMapContainer>
  );
};

export default DeviceDetailsMap;
