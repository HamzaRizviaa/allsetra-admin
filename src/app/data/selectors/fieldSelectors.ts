import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFieldsReducerLoading = (state: RootState) =>
  state.rootReducer.fieldsReducer.loading;

// Fields State Selectors
export const selectTotalFields = (state: RootState) =>
  state.rootReducer.fieldsReducer.totalFields;

export const selectAllFields = (state: RootState) =>
  state.rootReducer.fieldsReducer.fields;

export const selectFieldsState = createSelector(
  selectFieldsReducerLoading,
  selectTotalFields,
  selectAllFields,
  (loading, totalFields, allFields) => ({
    loading,
    totalFields,
    allFields,
  })
);
