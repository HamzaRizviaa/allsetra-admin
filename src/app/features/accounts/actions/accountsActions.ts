import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types, utils } from "@vilocnv/allsetra-core";

export const getAllAccountsThunk = createAsyncThunk(
  "accounts/getAllAccountsThunk",
  async () => {
    try {
      const response = await Accounts.getAllAccounts();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAccountsByQueryThunk = createAsyncThunk(
  "accounts/getAccountsByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await Accounts.getAccountsByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createAccountThunk = createAsyncThunk(
  "accounts/createAccountThunk",
  async (data: any, { dispatch }) => {
    try {
      const response = await Accounts.createAccount(data);

      if (response.status === 202) {
        toast.success("Account has been created");
        dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateAccountThunk = createAsyncThunk(
  "accounts/deactivateAccountThunk",
  async (accountId: string, { dispatch }) => {
    try {
      const response = await Accounts.deactivateAccount(accountId);

      if (response.status === 202) {
        toast.success("Account has been deactivated");
        dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const activateAccountThunk = createAsyncThunk(
  "accounts/activateAccountThunk",
  async (accountId: string, { dispatch }) => {
    try {
      const response = await Accounts.reactivateAccount(accountId);

      if (response.status === 202) {
        toast.success("Account has been reactivated");
        dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
