import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldsService } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAllFieldsThunk = createAsyncThunk(
  "fields/getAllFieldsThunk",
  async () => {
    try {
      const response = await FieldsService.getAllFields();

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
      const response = await FieldsService.getFieldsByQuery(params);

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
      const response = await FieldsService.deactivateField(fieldId);

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
      const response = await FieldsService.reactivateField(fieldId);

      if (response.status === 202) {
        toast.success("Field has been activated");
        dispatch(getAllFieldsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
