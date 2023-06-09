import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

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
  async ({ accountId, data }: any, { dispatch }) => {
    try {
      const response = await Accounts.assignServiceToAccount(accountId, data);

      if (response.status === 202) {
        toast.success("Service has been assigned to the account");
        dispatch(
          getAccountServicesThunk({
            accountId,
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

export const removeServiceFromAccountThunk = createAsyncThunk(
  "accounts/removeServiceFromAccountThunk",
  async ({ accountId, serviceId }: any, { dispatch }) => {
    try {
      const response = await Accounts.removeServiceFromAccount(
        accountId,
        serviceId
      );

      if (response.status === 202) {
        toast.success("Service has been removed from the account");
        dispatch(
          getAccountServicesThunk({
            accountId,
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
