import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast, types } from "@vilocnv/allsetra-core";
import { ObjectTypes } from "app/data/services";

export const getAllObjectTypesThunk = createAsyncThunk(
  "objectTypes/getAllObjectTypesThunk",
  async () => {
    try {
      const response = await ObjectTypes.getAllObjectTypes();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getObjectTypesByQueryThunk = createAsyncThunk(
  "objectTypes/getObjectTypesByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await ObjectTypes.getObjectTypesByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateObjectTypeThunk = createAsyncThunk(
  "objectTypes/deactivateAccountThunk",
  async (objectTypesID: string, { dispatch }) => {
    try {
      const response = await ObjectTypes.deactivateObjectType(objectTypesID);

      if (response.status === 202) {
        toast.success("Object type has been deactivated");
        dispatch(getAllObjectTypesThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const activateObjectTypeThunk = createAsyncThunk(
  "objectTypes/activateObjectTypeThunk",
  async (objectTypesID: string, { dispatch }) => {
    try {
      const response = await ObjectTypes.reactivateObjectType(objectTypesID);

      if (response.status === 202) {
        toast.success("Object type has been reactivated");
        dispatch(getAllObjectTypesThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createOrUpdateObjectTypeThunk = createAsyncThunk(
  "objectType/createOrUpdateObjectTypeThunk",
  async (data: any) => {
    try {
      const response = data.uniqueId
        ? await ObjectTypes.updateObjectType(data.uniqueId, data)
        : await ObjectTypes.createObjectType(data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success("Object Type has been updated")
          : toast.success("Object Type has been created");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificObjectThunk = createAsyncThunk(
  "objectType/getSpecificObjectThunk",
  async (objectTypesID: string) => {
    try {
      const response = await ObjectTypes.getSpecificObjectType(objectTypesID);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
