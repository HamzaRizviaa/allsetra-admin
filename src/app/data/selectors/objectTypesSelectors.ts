import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectObjectTypesReducerLoading = (state: RootState) =>
  state.rootReducer.objectTypesReducer.loading;

export const selectAllObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.allObjectTypes;

export const selectTotalObjectTypes = (state: RootState) =>
  state.rootReducer.objectTypesReducer.totalObjectTypes;

export const selectObjectTypesState = createSelector(
  selectAllObjectTypes,
  selectObjectTypesReducerLoading,
  selectTotalObjectTypes,
  (allObjectTypes, loading, totalObjectTypes) => ({
    allObjectTypes,
    loading,
    totalObjectTypes,
  })
);
