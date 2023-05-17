import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountsService } from "app/data/services";
import { toast } from "@vilocnv/allsetra-core";

export const getAllAccountsThunk = createAsyncThunk(
  "accounts/getAllAccountsThunk",
  async () => {
    try {
      const response = await AccountsService.getAllAccounts();

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
  async (data: any) => {
    try {
      const response = await AccountsService.createAccount(data);

      if (response.status === 202) {
        toast.success("Account has been created");
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
      const response = await AccountsService.deactivateAccount(accountId);

      if (response.status === 202) {
        toast.success("Account has been deactivated");
        dispatch(getAllAccountsThunk());
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
      const response = await AccountsService.reactivateAccount(accountId);

      if (response.status === 202) {
        toast.success("Account has been activated");
        dispatch(getAllAccountsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

//
// Account User Actions
//
export const getAccountUsersThunk = createAsyncThunk(
  "accounts/getAccountUsersThunk",
  async (accountId: string) => {
    try {
      const response = await AccountsService.getAccountUsers(accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeAccountUserThunk = createAsyncThunk(
  "accounts/removeAccountUserThunk",
  async ({ accountId, userId }: any, { dispatch }) => {
    try {
      const response = await AccountsService.removeAccountUser(
        accountId,
        userId
      );

      if (response.status === 202) {
        toast.success("User has been removed from the Account");
        dispatch(getAccountUsersThunk(accountId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
