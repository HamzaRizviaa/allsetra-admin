import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFieldsReducerLoading = (state: RootState) =>
  state.rootReducer.fieldsReducer.loading;

export const selectSpecificFieldLoading = (state: RootState) =>
  state.rootReducer.fieldsReducer.specificFieldLoading;

// Fields State Selectors
export const selectTotalFields = (state: RootState) =>
  state.rootReducer.fieldsReducer.totalFields;

export const selectAllFields = (state: RootState) =>
  state.rootReducer.fieldsReducer.fields;

export const selectSpecificField = (state: RootState) =>
  state.rootReducer.fieldsReducer.specificField;

//Field Types Selectors
export const selectAllFieldTypes = (state: RootState) =>
  state.rootReducer.fieldsReducer.fieldTypes;

export const selectFieldsState = createSelector(
  selectFieldsReducerLoading,
  selectTotalFields,
  selectAllFields,
  selectSpecificFieldLoading,
  selectSpecificField,
  (loading, totalFields, allFields, specificFieldLoading, specificField) => ({
    loading,
    totalFields,
    allFields,
    specificFieldLoading,
    specificField,
  })
);

export const selectFeildTypesState = createSelector(
  selectFieldsReducerLoading,
  selectAllFieldTypes,
  (loading, allFieldTypes) => ({ loading, allFieldTypes })
);
