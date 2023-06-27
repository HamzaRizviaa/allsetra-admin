import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "@vilocnv/allsetra-core";
// @ts-ignore
import Settings from "app/data/services/Settings";

export const getSpecificSettingThunk = createAsyncThunk(
  "settings/getSpecificSettingThunk",
  async () => {
    try {
      const response = await Settings.getSpecificSetting();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const updateSettingsThunk = createAsyncThunk(
  "settings/updateSettingsThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = await Settings.updateSettings(data);

      if (response.status === 202) {
        toast.success("User Settings have been updated");
        dispatch(getSpecificSettingThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
