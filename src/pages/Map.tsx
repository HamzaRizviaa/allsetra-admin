import { FC } from "react";
import { useAppSelector, useDispatchOnMount } from "hooks";
import { selectObjectsState } from "app/data/selectors";
import { getAllObjectsThunk } from "app/features";
import Map from "components/common/Map/Map";

const MapMain: FC = () => {
  const { allObjects } = useAppSelector(selectObjectsState);

  useDispatchOnMount(getAllObjectsThunk, allObjects.length ? undefined : true);

  const geozone = [{ lat: 52.150125, lng: 5.4 }];

  return (
    <Map
      center={{ lat: 52.0, lng: 5.301137 }}
      zoom={10}
      radius={50}
      objects={allObjects}
      geozone={geozone}
    />
  );
};

export default MapMain;
