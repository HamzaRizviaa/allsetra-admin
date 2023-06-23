import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectDashboardReducerLoading = (state: RootState) =>
  state.rootReducer.dashboardReducer.loading;

export const selectIdToken = (state: RootState) =>
  state.rootReducer.dashboardReducer.idToken;

export const selectUserEmail = (state: RootState) =>
  state.rootReducer.dashboardReducer.userEmail;

export const selectActiveUserDetails = createSelector(
  selectIdToken,
  selectUserEmail,
  (idToken, userEmail) => ({ idToken, userEmail })
);

export const selectIsDrawerCollapsed = (state: RootState) =>
  state.rootReducer.dashboardReducer.isDrawerCollapsed;

export const selectAllRoles = (state: RootState) =>
  state.rootReducer.dashboardReducer.roles;

export const selectAllCurrencies = (state: RootState) =>
  state.rootReducer.dashboardReducer.currencies;

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

export const selectAllLanguages = (state: RootState) =>
  state.rootReducer.dashboardReducer.languages;

export const selectLanguageState = createSelector(
  selectDashboardReducerLoading,
  selectAllLanguages,
  (loading, languages) => ({
    loading,
    languages,
  })
);
