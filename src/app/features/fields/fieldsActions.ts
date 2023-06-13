import { createAsyncThunk } from "@reduxjs/toolkit";
import { Fields } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAllFieldsThunk = createAsyncThunk(
  "fields/getAllFieldsThunk",
  async () => {
    try {
      const response = await Fields.getAllFields();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getFieldsByQueryThunk = createAsyncThunk(
  "fields/getFieldsByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await Fields.getFieldsByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificFieldThunk = createAsyncThunk(
  "fields/getSpecificFieldThunk",
  async (fieldId: string) => {
    try {
      const response = await Fields.getSpecificField(fieldId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateFieldThunk = createAsyncThunk(
  "fields/deactivateFieldThunk",
  async (fieldId: string, { dispatch }) => {
    try {
      const response = await Fields.deactivateField(fieldId);

      if (response.status === 202) {
        toast.success("Field has been deactivated");
        dispatch(getAllFieldsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const reactivateFieldThunk = createAsyncThunk(
  "fields/reactivateFieldThunk",
  async (fieldId: string, { dispatch }) => {
    try {
      const response = await Fields.reactivateField(fieldId);

      if (response.status === 202) {
        toast.success("Field has been reactivated");
        dispatch(getAllFieldsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createOrUpdateFieldThunk = createAsyncThunk(
  "fields/createOrUpdateFieldThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = data.uniqueId
        ? await Fields.updateField(data.uniqueId, data)
        : await Fields.createField(data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success("Field has been updated")
          : toast.success("Field has been created");
        dispatch(getAllFieldsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllFieldTypesThunk = createAsyncThunk(
  "fields/getAllFieldTypesThunk",
  async () => {
    try {
      const response = await Fields.getAllFieldTypes();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
