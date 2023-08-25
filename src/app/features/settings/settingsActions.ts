import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "@vilocnv/allsetra-core";
import { Settings } from "app/data/services";

export const getSpecificSettingThunk = createAsyncThunk(
  "settings/getSpecificSettingThunk",
  async () => {
    try {
      const response = await Settings.getSpecificSetting();

      if (response.status === 200) {
        return response.data;
      }

      return response;
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
        toast.success("Update settings request is being processed by the backend.");
        dispatch(getSpecificSettingThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "settings/resetPasswordThunk",
  async (data: any) => {
    try {
      const response = await Settings.resetPassword(data);

      if (response.status === 202) {
        toast.success("Password has been changed successfully");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllLanguagesThunk = createAsyncThunk(
  "settings/getAllLanguagesThunk",
  async () => {
    try {
      const response = await Settings.getAllLanguages();

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
