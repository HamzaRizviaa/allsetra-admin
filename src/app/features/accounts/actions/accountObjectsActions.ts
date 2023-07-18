import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

export const getAccountObjectsThunk = createAsyncThunk(
  "accounts/getAccountObjectsThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountObjects(params, accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeObjectFromAccountThunk = createAsyncThunk(
  "accounts/removeObjectFromAccountThunk",
  async ({ accountId, objectId }: any, { dispatch }) => {
    try {
      const response = await Accounts.removeObjectFromAccount(
        accountId,
        objectId
      );

      if (response.status === 202) {
        toast.success("Object has been removed from the account");
        dispatch(
          getAccountObjectsThunk({
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
