import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectServiceReducerLoading = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.loading;

export const selectTotalServices = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.totalServices;

export const selectAllServices = (state: RootState) =>
  state.rootReducer.serviceManagerReducer.services;

export const selectServicManagerState = createSelector(
  selectServiceReducerLoading,
  selectTotalServices,
  selectAllServices,
  (loading, totalServices, services) => ({ loading, totalServices, services })
);
