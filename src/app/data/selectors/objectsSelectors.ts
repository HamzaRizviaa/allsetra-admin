import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectAllTheObjects = (state: RootState) =>
  state.rootReducer.objectsReducer.allObjects;

export const selectObjectsReducerLoading = (state: RootState) =>
  state.rootReducer.objectsReducer.loading;

export const selectObjectsState = createSelector(
  selectAllTheObjects,
  selectObjectsReducerLoading,
  (allObjects, loading) => ({
    allObjects,
    loading,
  })
);
