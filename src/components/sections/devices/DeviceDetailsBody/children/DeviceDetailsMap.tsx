import { FC } from "react";
import { DeviceDetailsMapContainer } from "../DeviceDetailsBody.styled";
import { IDevices } from "app/data/types";
import Map from "components/common/Map/Map";

interface Props {
  specificDevice: IDevices | null;
}

const DeviceDetailsMap: FC<Props> = ({ specificDevice }) => {
  return (
    <DeviceDetailsMapContainer>
      <Map
        center={{
          lat: specificDevice?.object?.location?.latitude || 0,
          lng: specificDevice?.object?.location?.longitude || 0,
        }}
        zoom={10}
        radius={50}
        objects={[specificDevice?.object]}
        geozone={[
          {
            lat: specificDevice?.object?.location?.latitude || 0,
            lng: specificDevice?.object?.location?.longitude || 0,
          },
        ]}
      />
    </DeviceDetailsMapContainer>
  );
};

export default DeviceDetailsMap;
