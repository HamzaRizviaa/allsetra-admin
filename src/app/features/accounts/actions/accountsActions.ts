import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

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

export const getSpecificAccountThunk = createAsyncThunk(
  "accounts/getSpecificAccountThunk",
  async (accountId: string) => {
    try {
      const response = await Accounts.getSpecificAccount(accountId);

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAccountsIndustriesThunk = createAsyncThunk(
  "accounts/getAccountsIndustriesThunk",
  async () => {
    try {
      const response = await Accounts.getAccountsIndustries();

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAccountsTypesThunk = createAsyncThunk(
  "accounts/getAccountsTypesThunk",
  async () => {
    try {
      const response = await Accounts.getAccountsTypes();

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createAccountThunk = createAsyncThunk(
  "accounts/createAccountThunk",
  async (data: any) => {
    try {
      const response = await Accounts.createAccount(data);

      if (response.status === 202) {
        toast.success(
          "Account creation request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const updateAccountThunk = createAsyncThunk(
  "accounts/updateAccountThunk",
  async ({ accountId, data }: { accountId: string; data: any }) => {
    try {
      const response = await Accounts.updateAccount(accountId, data);

      if (response.status === 202) {
        toast.success(
          "Account update request is being processed by the backend."
        );
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
  async (accountId: string) => {
    try {
      const response = await Accounts.deactivateAccount(accountId);

      if (response.status === 202) {
        toast.success(
          "Account deactivation request is being processed by the backend."
        );
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
  async (accountId: string) => {
    try {
      const response = await Accounts.reactivateAccount(accountId);

      if (response.status === 202) {
        toast.success(
          "Account activation request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
