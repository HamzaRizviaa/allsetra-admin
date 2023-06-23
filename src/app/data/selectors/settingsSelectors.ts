import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectSettingsReducerLoading = (state: RootState) =>
  state.rootReducer.settingsReducer.loading;

// Settings State Selectors

export const selectSpecificSettings = (state: RootState) =>
  state.rootReducer.settingsReducer.specificSetting;

export const selectSettingsState = createSelector(
  selectSettingsReducerLoading,
  selectSpecificSettings,
  (loading, specificSetting) => ({
    loading,
    specificSetting,
  })
);
