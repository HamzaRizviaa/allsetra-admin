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

export const selectDeviceTypesModules = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesModules;

export const selectDeviceTypesProfilesDataPoints = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesDataPoints;

export const selectDeviceTypesProfilesIdentifiers = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesIdentifiers;

export const selectDeviceTypesProfilesTriggerModes = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesTriggerModes;

export const selectDeviceTypesProfilesEnvironments = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesEnvironments;

export const selectDeviceTypesProfilesInputPins = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesInputPins;

export const selectDeviceTypesProfilesOutputPins = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.deviceTypesProfilesOutputPins;

export const selectDeviceTypesProfilesIdentifiersLoading = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.identifierLoading;

export const selectAllIdentifiers = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.allIdentifiers;

export const selectSpecificDeviceTypeProfile = (state: RootState) =>
  state.rootReducer.deviceManagerReducer.specificDeviceTypeProfile;

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
      (deviceType: any) => deviceType.uniqueId === deviceTypeId
    );
  }
);

//Device Types Profile selectors
export const selectDeviceTypesProfileState = createSelector(
  selectDeviceManagerReducerLoading,
  selectDeviceTypesTotalRecords,
  selectDeviceTypesProfiles,
  selectSpecificDeviceTypeProfile,
  (loading, totalRecords, deviceTypesProfiles, specificDeviceTypeProfile) => ({
    loading,
    totalRecords,
    deviceTypesProfiles,
    specificDeviceTypeProfile,
  })
);

export const selectAddDeviceTypesProfileState = createSelector(
  selectDeviceManagerReducerLoading,
  selectDeviceTypesProfilesIdentifiersLoading,
  selectDeviceTypesProfilesDataPoints,
  selectDeviceTypesProfilesIdentifiers,
  selectDeviceTypesProfilesTriggerModes,
  selectDeviceTypesProfilesEnvironments,
  selectDeviceTypesProfilesInputPins,
  selectDeviceTypesProfilesOutputPins,
  selectAllIdentifiers,
  (
    loading,
    identifierLoading,
    deviceTypesProfilesDataPoints,
    deviceTypesProfilesIdentifiers,
    deviceTypesProfilesTriggerModes,
    deviceTypesProfilesEnvironments,
    deviceTypesProfilesInputPins,
    deviceTypesProfilesOutputPins,
    allIdentifiers
  ) => ({
    loading,
    identifierLoading,
    deviceTypesProfilesDataPoints,
    deviceTypesProfilesIdentifiers,
    deviceTypesProfilesTriggerModes,
    deviceTypesProfilesEnvironments,
    deviceTypesProfilesInputPins,
    deviceTypesProfilesOutputPins,
    allIdentifiers,
  })
);

//Device Types Modules selectors
export const selectDeviceTypesModulesState = createSelector(
  selectDeviceManagerReducerLoading,
  selectDeviceTypesTotalRecords,
  selectDeviceTypesModules,
  (loading, totalRecords, deviceTypesModules) => ({
    loading,
    totalRecords,
    deviceTypesModules,
  })
);
