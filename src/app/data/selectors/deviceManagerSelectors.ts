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

export const selectActiveDeviceTypeId = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.activeDeviceTypeId;

export const selectDeviceTypesTotalRecords = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.totalRecords;

export const selectDeviceTypesProfiles = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfiles;

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

export const selectActiveDeviceType = createSelector(
  selectDeviceTypes,
  selectActiveDeviceTypeId,
  (deviceTypes, deviceTypeId) => {
    return deviceTypes.find(
      (deviceType: any) => deviceType.uniqueId == deviceTypeId
    );
  }
);

//Device Types Profile selectors
export const selectDeviceTypesProfileState = createSelector(
  selectDeviceManagerReducerLoading,
  selectDeviceTypesTotalRecords,
  selectDeviceTypesProfiles,
  (loading, totalRecords, deviceTypesProfiles) => ({
    loading,
    totalRecords,
    deviceTypesProfiles,
  })
);
