import { createAsyncThunk } from "@reduxjs/toolkit";
import { Devices } from "app/data/services";

export const getDeviceLocationHistoryThunk = createAsyncThunk(
  "devices/getDeviceLocationHistoryThunk",
  async ({ deviceId, locationSearch }: any) => {
    try {
      const response = await Devices.getDeviceLocationHistory(
        deviceId,
        locationSearch
      );

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
