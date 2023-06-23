import { createSlice } from "@reduxjs/toolkit";
import { getSpecificSettingThunk } from "./settingsActions";

export interface ISettingsState {
  loading: boolean;

  // Settings State
  specificSetting: Object | null;
}

const initialState: ISettingsState = {
  loading: false,
  specificSetting: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSpecificSetting: (state) => {
      state.specificSetting = null;
    },
  },
  extraReducers: (builder) => {
    // Get User Settings Action Cases
    builder.addCase(getSpecificSettingThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSpecificSettingThunk.fulfilled, (state, action) => {
      state.specificSetting = action.payload;
      state.loading = false;
    });

    builder.addCase(getSpecificSettingThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetSpecificSetting } = settingsSlice.actions;

export * from "./settingsActions";
export default settingsSlice.reducer;
