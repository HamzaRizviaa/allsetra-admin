import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectServiceReducerLoading = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.loading;

export const selectTotalServices = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.totalServices;

export const selectAllServices = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.services;

export const selectAllTheServices = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.allServices;

export const selectSpecificServiceLoading = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.specificServiceLoading;

export const selectSpecificService = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.specificService;

export const selectServicManagerState = createSelector(
  selectServiceReducerLoading,
  selectTotalServices,
  selectAllServices,
  selectAllTheServices,
  (loading, totalServices, services, allServices) => ({
    loading,
    totalServices,
    services,
    allServices,
  })
);

export const selectSpecificServiceState = createSelector(
  selectSpecificServiceLoading,
  selectSpecificService,
  (specificServiceLoading, specificService) => ({
    specificServiceLoading,
    specificService,
  })
);
