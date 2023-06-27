import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectObjectTypesReducerLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.loading;

export const selectAllTheObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.allObjectTypes;

export const selectAllObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.objectTypes;

export const selectTotalObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.totalObjectTypes;

export const selectSpecificObjectType = (state: RootState) =>
  state.rootReducer.objectTypesReducer.specificObject;

export const selectSpecificObjectTypeLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.specificObjectLoading;

export const selectObjectTypesLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.objectTypesLoading;

export const selectObjectTypesState = createSelector(
  selectAllObjectTypes,
  selectAllTheObjectTypes,
  selectObjectTypesReducerLoading,
  selectTotalObjectTypes,
  selectSpecificObjectType,
  selectSpecificObjectTypeLoading,
  selectObjectTypesLoading,
  (
    objectTypes,
    allObjectTypes,
    loading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading,
    objectTypesLoading
  ) => ({
    objectTypes,
    allObjectTypes,
    loading,
    totalObjectTypes,
    specificObject,
    specificObjectLoading,
    objectTypesLoading,
  })
);
