import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAccountObjectTypesThunk = createAsyncThunk(
  "accounts/getAccountObjectTypesThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountObjectTypes(params, accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const assignObjectTypeToAccountThunk = createAsyncThunk(
  "accounts/assignObjectTypeToAccountThunk",
  async ({ accountId, objectTypeId }: any) => {
    try {
      const response = await Accounts.assignObjectTypeToAccount(
        accountId,
        objectTypeId
      );

      if (response.status === 202) {
        toast.success("Object type has been assigned to the account");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeObjectTypeFromAccountThunk = createAsyncThunk(
  "accounts/removeObjectTypeFromAccountThunk",
  async ({ accountId, objectTypeId }: any) => {
    try {
      const response = await Accounts.removeObjectTypeFromAccount(
        accountId,
        objectTypeId
      );

      if (response.status === 202) {
        toast.success("Object type has been removed from the account");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
