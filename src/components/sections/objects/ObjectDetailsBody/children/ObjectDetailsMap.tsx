import { FC } from "react";
import { types } from "@vilocnv/allsetra-core";
import { ObjectMapContainer } from "../ObjectDetailsBody.styled";
import Map from "components/common/Map/Map";

interface Props {
  activeObject: types.IObject | null;
}

const ObjectDetailsMap: FC<Props> = ({ activeObject }) => {
  const objectLocation = {
    lat: activeObject?.location?.latitude || 0,
    lng: activeObject?.location?.longitude || 0,
  };
  return (
    <ObjectMapContainer>
      <Map
        center={objectLocation}
        zoom={10}
        radius={50}
        objects={[activeObject]}
        geozones={[objectLocation]}
      />
    </ObjectMapContainer>
  );
};

export default ObjectDetailsMap;
