import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAccountAssociatedUsersThunk = createAsyncThunk(
  "accounts/getAccountAssociatedUsersThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountAssociatedUsers(
        accountId,
        params
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAvailableUsersForAccountThunk = createAsyncThunk(
  "accounts/getAvailableUsersForAccountThunk",
  async (accountId: string) => {
    try {
      const response = await Accounts.getAvailableUsersForAccount(accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeUserFromAccountThunk = createAsyncThunk(
  "accounts/removeUserFromAccountThunk",
  async ({ accountId, userId }: any) => {
    try {
      const response = await Accounts.removeUserFromAccount(accountId, userId);

      if (response.status === 202) {
        toast.success(
          "User removing request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const associateUserToAccountThunk = createAsyncThunk(
  "accounts/associateUserToAccountThunk",
  async ({ accountId, userId, data }: any, { dispatch }) => {
    try {
      const response = await Accounts.associateUserToAccount(
        accountId,
        userId,
        data
      );

      if (response.status === 202) {
        toast.success("User has been assigned to account");
        dispatch(getAccountAssociatedUsersThunk(accountId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createUserAndAssociateToAccountThunk = createAsyncThunk(
  "accounts/createUserAndAssociateToAccountThunk",
  async ({ accountId, values }: any, { dispatch }) => {
    try {
      const response = await Accounts.createUserAndAssociateToAccount(
        accountId,
        values
      );

      if (response.status === 202) {
        toast.success("User has been created and assigned to account");
        dispatch(getAccountAssociatedUsersThunk(accountId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getUsersWithRoleDriverThunk = createAsyncThunk(
  "accounts/getUsersWithRoleDriverThunk",
  async (accountId: string) => {
    try {
      const response = await Accounts.getUsersWithRoleDriver(accountId);

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
