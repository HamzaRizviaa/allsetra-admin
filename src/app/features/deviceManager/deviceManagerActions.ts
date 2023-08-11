import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeviceManager } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

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

//Device Types Detail

export const updateDeviceTypesDetailThunk = createAsyncThunk(
  "deviceManager/updateDeviceTypesDetailThunk",
  async (data: any) => {
    try {
      const response = await DeviceManager.updateDeviceType(
        data.uniqueId,
        data
      );

      if (response.status === 202) {
        toast.success("Device Type has been updated");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

//Device Types Profiles

export const getDeviceTypesProfilesThunk = createAsyncThunk(
  "deviceManager/getDeviceTypesProfilesThunk",
  async ({
    params,
    deviceTypeId,
  }: {
    params: types.IRecordsAggregationBody;
    deviceTypeId: string;
  }) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfiles(
        params,
        deviceTypeId
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeProfileFromDeviceTypeThunk = createAsyncThunk(
  "accounts/removeProfileFromDeviceTypeThunk",
  async ({ deviceTypeId, deviceTypeProfileId }: any, { dispatch }) => {
    try {
      const response = await DeviceManager.removeProfileFromDeviceType(
        deviceTypeId,
        deviceTypeProfileId
      );

      if (response.status === 202) {
        toast.success("Profile has been removed from the device type");
        dispatch(
          getDeviceTypesProfilesThunk({
            deviceTypeId,
            params: utils.getCommonParamsForApi(),
          })
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

//Device Types Modules

export const getDeviceTypesModulesThunk = createAsyncThunk(
  "deviceManager/getDeviceTypesModulesThunk",
  async ({
    params,
    deviceTypeId,
  }: {
    params: types.IRecordsAggregationBody;
    deviceTypeId: string;
  }) => {
    try {
      const response = await DeviceManager.getDeviceTypesModules(
        params,
        deviceTypeId
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
