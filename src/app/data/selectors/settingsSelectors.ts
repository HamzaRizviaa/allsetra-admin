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

export const selectAllLanguages = (state: RootState) =>
  state.rootReducer.settingsReducer.languages;

export const selectLanguagesLoading = (state: RootState) =>
  state.rootReducer.settingsReducer.languagesLoading;

export const selectLanguageState = createSelector(
  selectAllLanguages,
  selectLanguagesLoading,
  (languages, languagesLoading) => ({
    languages,
    languagesLoading,
  })
);
