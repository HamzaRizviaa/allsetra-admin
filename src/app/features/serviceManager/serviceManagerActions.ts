import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceManager } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

export const getAllServicesThunk = createAsyncThunk(
  "serviceManager/getAllServicesThunk",
  async () => {
    try {
      const response = await ServiceManager.getAllServices();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getServicesByQueryThunk = createAsyncThunk(
  "serviceManager/getServicesByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await ServiceManager.getServicesByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createOrUpdateServiceThunk = createAsyncThunk(
  "serviceManager/createOrUpdateServiceThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = data.uniqueId
        ? await ServiceManager.updateService(data.uniqueId, data)
        : await ServiceManager.createService(data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success("Service has been updated")
          : toast.success("Service has been created");

        dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateServiceThunk = createAsyncThunk(
  "serviceManager/deactivateServiceThunk",
  async (serviceId: string, { dispatch }) => {
    try {
      const response = await ServiceManager.deactivateService(serviceId);

      if (response.status === 202) {
        toast.success("Service has been deactivated");
        dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const activateServiceThunk = createAsyncThunk(
  "serviceManager/activateServiceThunk",
  async (serviceId: string, { dispatch }) => {
    try {
      const response = await ServiceManager.activateService(serviceId);

      if (response.status === 202) {
        toast.success("Service has been activated");
        dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
