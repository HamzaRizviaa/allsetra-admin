import React, { useEffect } from "react";
import Map from "./Map/Map";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectObjectsState } from "app/data/selectors";
import { getAllObjectsThunk } from "app/features";

const MapMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allObjects } = useAppSelector(selectObjectsState);

  useEffect(() => {
    dispatch(getAllObjectsThunk());
  }, []);

  return (
    <Map
      center={{ lat: 24.860735, lng: 67.001137 }}
      zoom={15}
      radius={500}
      objects={allObjects}
    />
  );
};

export default MapMain;
