import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectDeviceManagerReducerLoading = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.loading;

//
// Device Types Selectors
//
export const selectTotalDeviceTypes = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.totalDeviceTypes;

export const selectDeviceTypes = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypes;

export const selectDeviceTypesState = createSelector(
  selectDeviceManagerReducerLoading,
  selectTotalDeviceTypes,
  selectDeviceTypes,
  (loading, totalDeviceTypes, deviceTypes) => ({
    loading,
    totalDeviceTypes,
    deviceTypes,
  })
);
