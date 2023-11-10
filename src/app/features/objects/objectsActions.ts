import { createAsyncThunk } from "@reduxjs/toolkit";
import { types, toast } from "@vilocnv/allsetra-core";
import Objects from "app/data/services/Objects";

export const getAllObjectsThunk = createAsyncThunk(
  "objects/getAllObjectsThunk",
  async () => {
    try {
      const response = await Objects.getAllObjects();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getObjectsByQueryThunk = createAsyncThunk(
  "objects/getObjectsByQueryThunk",
  async (data: types.IRecordsAggregationBody) => {
    try {
      const response = await Objects.getObjectsByQuery(data);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificObjectByIdThunk = createAsyncThunk(
  "objects/getSpecificObjectByIdThunk",
  async (objectId: string) => {
    try {
      const response = await Objects.getSpecificObjectById(objectId);

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

export const postUpdateObjectThunk = createAsyncThunk(
  "objects/postUpdateObjectThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = await Objects.postUpdateObject(data);

      if (response.status === 202) {
        toast.success("Object settings has been updated");
        dispatch(getSpecificObjectByIdThunk(data.uniqueId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const disconnectDeviceFromObjectThunk = createAsyncThunk(
  "objects/disconnectDeviceFromObjectThunk",
  async ({ objectId, deviceId }: any, { dispatch }) => {
    try {
      const response = await Objects.disconnectDeviceFromObject(
        objectId,
        deviceId
      );

      if (response.status === 202) {
        toast.success("Device has been disconnected from object");
        dispatch(getSpecificObjectByIdThunk(objectId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllSubscriptionsByObjectIdThunk = createAsyncThunk(
  "objects/getAllSubscriptionsByObjectIdThunk",
  async (objectId: string) => {
    try {
      const response = await Objects.getAllSubscriptionsByObjectId(objectId);

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

export const getObjectsLocationsThunk = createAsyncThunk(
  "objects/getObjectsLocationsThunk",
  async ({ accountId, values }: { accountId: string; values: any }) => {
    try {
      const response = await Objects.getObjectsLocations(accountId, values);

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
      throw new Error(e);
    }
  }
);
