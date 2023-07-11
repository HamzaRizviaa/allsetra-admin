import { createSlice } from "@reduxjs/toolkit";
import {
  getSpecificSettingThunk,
  getAllLanguagesThunk,
} from "./settingsActions";

export interface ISettingsState {
  loading: boolean;
  specificSetting: Object | null;
  languagesLoading: boolean;
  languages: Array<any>;
}

const initialState: ISettingsState = {
  loading: false,
  specificSetting: null,
  languagesLoading: false,
  languages: [],
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

    // Get All Languages Action Cases
    builder.addCase(getAllLanguagesThunk.pending, (state) => {
      state.languagesLoading = true;
    });

    builder.addCase(getAllLanguagesThunk.fulfilled, (state, action) => {
      state.languages = action.payload;
      state.languagesLoading = false;
    });

    builder.addCase(getAllLanguagesThunk.rejected, (state) => {
      state.languagesLoading = false;
    });
  },
});

export const { resetSpecificSetting } = settingsSlice.actions;

export * from "./settingsActions";
export default settingsSlice.reducer;
