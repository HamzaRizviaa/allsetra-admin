import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAccountDeviceTypesThunk = createAsyncThunk(
  "accounts/getAccountDeviceTypesThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountDeviceTypes(params, accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const assignDeviceTypeToAccountThunk = createAsyncThunk(
  "accounts/assignDeviceTypeToAccountThunk",
  async ({ accountId, data }: any) => {
    try {
      const response = await Accounts.assignDeviceTypeToAccount(
        accountId,
        data
      );

      if (response.status === 202) {
        toast.success("Device type has been assigned to the account");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeDeviceTypeFromAccountThunk = createAsyncThunk(
  "accounts/removeDeviceTypeFromAccountThunk",
  async ({ accountId, deviceTypeId }: any) => {
    try {
      const response = await Accounts.removeDeviceTypeFromAccount(
        accountId,
        deviceTypeId
      );

      if (response.status === 202) {
        toast.success("Device type has been removed from the account");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
