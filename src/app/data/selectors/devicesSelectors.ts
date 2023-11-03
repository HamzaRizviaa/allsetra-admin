import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectDevicesReducerLoading = (state: RootState) =>
  state.rootReducer.devicesReducer.loading;

export const selectDeviceLocationHistory = (state: RootState) =>
  state.rootReducer.devicesReducer.deviceLocationHistory;

export const selectTotalDevices = (state: RootState) =>
  state.rootReducer.devicesReducer.totalDevices;

export const selectAllDevices = (state: RootState) =>
  state.rootReducer.devicesReducer.devices;

export const selectSpecificDevice = (state: RootState) =>
  state.rootReducer.devicesReducer.specificDevice;

export const selectAllDeviceSubscriptions = (state: RootState) =>
  state.rootReducer.devicesReducer.deviceSubscriptions;

export const selectDevicesSubscriptionLoading = (state: RootState) =>
  state.rootReducer.devicesReducer.deviceSubscriptionsLoading;

export const selectDevicesState = createSelector(
  selectDevicesReducerLoading,
  selectDeviceLocationHistory,
  selectTotalDevices,
  selectAllDevices,
  selectSpecificDevice,
  (
    loading,
    deviceLocationHistory,
    totalDevices,
    allDevices,
    specificDevice
  ) => ({
    loading,
    deviceLocationHistory,
    totalDevices,
    allDevices,
    specificDevice,
  })
);

export const selectDeviceSubscriptionsById = createSelector(
  selectAllDeviceSubscriptions,
  selectDevicesSubscriptionLoading,
  (deviceSubscriptions, deviceSubscriptionsLoading) => ({
    deviceSubscriptions,
    deviceSubscriptionsLoading,
  })
);
