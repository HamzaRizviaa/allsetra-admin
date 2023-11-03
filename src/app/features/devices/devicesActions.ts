import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast, types } from "@vilocnv/allsetra-core";
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

export const getAllDevicesThunk = createAsyncThunk(
  "devices/getAllDevicesThunk",
  async () => {
    try {
      const response = await Devices.getAllDevices();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificDeviceThunk = createAsyncThunk(
  "devices/getSpecificDeviceThunk",
  async (deviceId: string) => {
    try {
      const response = await Devices.getSpecificDeviceById(deviceId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getDevicesByQueryThunk = createAsyncThunk(
  "devices/getDevicesByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await Devices.getDevicesByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateDeviceThunk = createAsyncThunk(
  "devices/deactivateDeviceThunk",
  async (deviceId: string, { dispatch }) => {
    try {
      const response = await Devices.deactivateDevice(deviceId);

      if (response.status === 202) {
        toast.success("Device has been deactivated");
        dispatch(getAllDevicesThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const reactivateDeviceThunk = createAsyncThunk(
  "devices/reactivateDeviceThunk",
  async (deviceId: string, { dispatch }) => {
    try {
      const response = await Devices.reactivateDevice(deviceId);

      if (response.status === 202) {
        toast.success("Device has been reactivated");
        dispatch(getAllDevicesThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postUpdateDeviceThunk = createAsyncThunk(
  "devices/postUpdateDeviceThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = await Devices.postUpdateDevice(data);

      if (response.status === 202) {
        toast.success("Device settings have been updated");
        dispatch(getSpecificDeviceThunk(data.uniqueId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllSubscriptionsByDeviceIdThunk = createAsyncThunk(
  "objects/getAllSubscriptionsByObjectIdThunk",
  async (deviceId: string) => {
    try {
      const response = await Devices.getAllSubscriptionsByDeviceId(deviceId);

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

export const disableDeviceImmobilizerThunk = createAsyncThunk(
  "devices/disableDeviceImmobilizerThunk",
  async (deviceId: string) => {
    try {
      const response = await Devices.disableDeviceImmobilizer(deviceId);

      if (response.status === 400) {
        console.log("asdfasdf");
      }

      return response;
    } catch (e: any) {
      if (e.response?.status === 400) {
        toast.error(e.response.data.detail);
      } else {
        toast.error(e.message);
      }
      console.error(e);
      throw new Error(e);
    }
  }
);
