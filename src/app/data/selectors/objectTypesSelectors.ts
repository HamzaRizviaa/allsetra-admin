import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectObjectTypesReducerLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.loading;

export const selectAllObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.allObjectTypes;

export const selectTotalObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.totalObjectTypes;

export const selectSpecificObjectType = (state: RootState) =>
  state.rootReducer.objectTypesReducer.specificObject;

export const selectSpecificObjectTypeLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.specificObjectLoading;

export const selectObjectTypesState = createSelector(
  selectAllObjectTypes,
  selectObjectTypesReducerLoading,
  selectTotalObjectTypes,
  selectSpecificObjectType,
  selectSpecificObjectTypeLoading,
  (
    allObjectTypes,
    loading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading
  ) => ({
    allObjectTypes,
    loading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading,
  })
);
