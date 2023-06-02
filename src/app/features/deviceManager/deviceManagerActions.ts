import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeviceManager } from "app/data/services";
import { types } from "@vilocnv/allsetra-core";

//
// Device Types Actions
//
export const getAllDeviceTypesThunk = createAsyncThunk(
  "deviceManager/getAllDeviceTypesThunk",
  async () => {
    try {
      const response = await DeviceManager.getAllDeviceTypes();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getDeviceTypesByQueryThunk = createAsyncThunk(
  "deviceManager/getDeviceTypesByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await DeviceManager.getDeviceTypesByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
