import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectDevicesReducerLoading = (state: RootState) =>
  state.rootReducer.devicesReducer.loading;

export const selectDeviceLocationHistory = (state: RootState) =>
  state.rootReducer.devicesReducer.deviceLocationHistory;

export const selectDevicesState = createSelector(
  selectDevicesReducerLoading,
  selectDeviceLocationHistory,
  (loading, deviceLocationHistory) => ({ loading, deviceLocationHistory })
);
