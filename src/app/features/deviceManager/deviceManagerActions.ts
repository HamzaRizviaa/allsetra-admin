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

export const getDeviceTypesProfileDataPoints = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileDataPoints",
  async (deviceTypeId: string) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileDataPoints(
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

export const getDeviceTypesProfileIdentifiers = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileIdentifiers",
  async ({ deviceTypeId, fieldId }: any) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileIdentifiers(
        deviceTypeId,
        fieldId
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

export const getDeviceTypesProfileTriggerModes = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileTriggerModes",
  async (deviceTypeId: string) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileTriggerModes(
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

export const getDeviceTypesProfileEnvironments = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileEnvironments",
  async (deviceTypeId: string) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileEnvironments(
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
export const getDeviceTypesProfileInputPins = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileInputPins",
  async (deviceTypeId: string) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileInputPins(
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

export const getDeviceTypesProfileOutputPins = createAsyncThunk(
  "deviceManager/getDeviceTypesProfileOutputPins",
  async (deviceTypeId: string) => {
    try {
      const response = await DeviceManager.getDeviceTypesProfileOutputPins(
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

export const createOrUpdateDeviceTypesProfileThunk = createAsyncThunk(
  "deviceManager/createOrUpdateDeviceTypesProfileThunk",
  async ({ deviceTypeId, data }: any) => {
    try {
      const response = data.uniqueId
        ? await DeviceManager.updateDeviceTypeProfile(deviceTypeId, data)
        : await DeviceManager.createDeviceTypeProfile(deviceTypeId, data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success("Device Type Profile has been updated")
          : toast.success("Device Type Profile has been created");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificDeviceProfileThunk = createAsyncThunk(
  "deviceManager/getSpecificDeviceProfileThunk",
  async ({ deviceTypeId, deviceTypeProfileId }: any) => {
    try {
      const response = await DeviceManager.getSpecificDeviceProfile(
        deviceTypeId,
        deviceTypeProfileId
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
