import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceManager } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

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

export const getSpecificServiceByIdThunk = createAsyncThunk(
  "serviceManager/getSpecificServiceByIdThunk",
  async (serviceId: string) => {
    try {
      const response = await ServiceManager.getSpecificServiceById(serviceId);

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
  async (data: any) => {
    try {
      const response = data.uniqueId
        ? await ServiceManager.updateService(data.uniqueId, data)
        : await ServiceManager.createService(data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success(
              `Service updation request is being processed by the backend.`
            )
          : toast.success(
              `Service creation request is being processed by the backend.`
            );
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
  async (serviceId: string) => {
    try {
      const response = await ServiceManager.deactivateService(serviceId);

      if (response.status === 202) {
        toast.success(
          `Service deactivation request is being processed by the backend.`
        );
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
  async (serviceId: string) => {
    try {
      const response = await ServiceManager.activateService(serviceId);

      if (response.status === 202) {
        toast.success(
          `Service activation request is being processed by the backend.`
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
