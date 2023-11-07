import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAccountServicesThunk = createAsyncThunk(
  "accounts/getAccountServicesThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountServices(params, accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const assignServiceToAccountThunk = createAsyncThunk(
  "accounts/assignServiceToAccountThunk",
  async ({ accountId, data }: any) => {
    try {
      const response = await Accounts.assignServiceToAccount(accountId, data);

      if (response.status === 202) {
        toast.success(
          "Service assigning request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const updateServiceForAccountThunk = createAsyncThunk(
  "accounts/updateServiceForAccountThunk",
  async ({ accountId, serviceId, data }: any) => {
    try {
      const response = await Accounts.updateServiceForAccount(
        accountId,
        serviceId,
        data
      );

      if (response.status === 202) {
        toast.success(
          "Service update request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeServiceFromAccountThunk = createAsyncThunk(
  "accounts/removeServiceFromAccountThunk",
  async ({ accountId, serviceId }: any) => {
    try {
      const response = await Accounts.removeServiceFromAccount(
        accountId,
        serviceId
      );

      if (response.status === 202) {
        toast.success(
          "Service removing request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
