import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectIsDrawerCollapsed = (state: RootState) =>
  state.rootReducer.dashboardReducer.isDrawerCollapsed;

export const selectAllRoles = (state: RootState) =>
  state.rootReducer.dashboardReducer.roles;

export const selectAllIcons = (state: RootState) =>
  state.rootReducer.dashboardReducer.icons;

export const selectIconReducerLoading = (state: RootState) =>
  state.rootReducer.dashboardReducer.loading;

export const selectIconState = createSelector(
  selectIconReducerLoading,
  selectAllIcons,
  (loading, icons) => ({
    loading,
    icons,
  })
);
