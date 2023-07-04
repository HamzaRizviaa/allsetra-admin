import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectObjectsReducerLoading = (state: RootState) =>
  state.rootReducer.objectsReducer.loading;

export const selectAllTheObjects = (state: RootState) =>
  state.rootReducer.objectsReducer.allObjects;

export const selectObjectsQueried = (state: RootState) =>
  state.rootReducer.objectsReducer.objects;

export const selectObjectsTotalRecords = (state: RootState) =>
  state.rootReducer.objectsReducer.totalRecords;

export const selectActiveObject = (state: RootState) =>
  state.rootReducer.objectsReducer.activeObject;

export const selectObjectsState = createSelector(
  selectAllTheObjects,
  selectObjectsReducerLoading,
  (allObjects, loading) => ({
    allObjects,
    loading,
  })
);

export const selectQueriedObjectsState = createSelector(
  selectObjectsReducerLoading,
  selectObjectsQueried,
  selectObjectsTotalRecords,
  selectActiveObject,
  (loading, objects, totalRecords, activeObject) => ({
    loading,
    objects,
    totalRecords,
    activeObject,
  })
);
