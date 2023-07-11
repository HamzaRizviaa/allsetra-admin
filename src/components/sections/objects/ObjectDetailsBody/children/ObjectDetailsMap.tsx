import { FC } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { types } from "@vilocnv/allsetra-core";
import { ObjectMapContainer } from "../ObjectDetailsBody.styled";

interface Props {
  activeObject: types.IObject | null;
}

const ObjectDetailsMap: FC<Props> = ({ activeObject }) => {
  return (
    <ObjectMapContainer>
      <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={{
            lat: activeObject?.location.latitude || 0,
            lng: activeObject?.location.longitude || 0,
          }}
          zoom={8}
        >
          <MarkerF
            position={{
              lat: activeObject?.location.latitude || 0,
              lng: activeObject?.location.longitude || 0,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </ObjectMapContainer>
  );
};

export default ObjectDetailsMap;
