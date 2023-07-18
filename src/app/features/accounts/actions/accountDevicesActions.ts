import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

export const getAccountDevicesThunk = createAsyncThunk(
  "accounts/getAccountDevicesThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountDevices(params, accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeDeviceFromAccountThunk = createAsyncThunk(
  "accounts/removeDeviceFromAccountThunk",
  async ({ accountId, deviceId }: any, { dispatch }) => {
    try {
      const response = await Accounts.removeDeviceFromAccount(
        accountId,
        deviceId
      );

      if (response.status === 202) {
        toast.success("Device has been removed from the account");
        dispatch(
          getAccountDevicesThunk({
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
