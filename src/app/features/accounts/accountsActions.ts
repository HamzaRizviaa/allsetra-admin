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

export const getAccountsByQueryThunk = createAsyncThunk(
  "accounts/getAccountsByQueryThunk",
  async (data) => {
    try {
      const response = await AccountsService.getAccountsByQuery({
        page: 0,
        itemsPerPage: 10,
      });
      console.log({ response });

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
export const getAccountAssociatedUsersThunk = createAsyncThunk(
  "accounts/getAccountAssociatedUsersThunk",
  async (accountId: string) => {
    try {
      const response = await AccountsService.getAccountAssociatedUsers(
        accountId
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
      const response = await AccountsService.getAvailableUsersForAccount(
        accountId
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

export const removeUserFromAccountThunk = createAsyncThunk(
  "accounts/removeUserFromAccountThunk",
  async ({ accountId, userId }: any, { dispatch }) => {
    try {
      const response = await AccountsService.removeUserFromAccount(
        accountId,
        userId
      );

      if (response.status === 202) {
        toast.success("User has been removed from the Account");
        dispatch(getAccountAssociatedUsersThunk(accountId));
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
      const response = await AccountsService.associateUserToAccount(
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
      const response = await AccountsService.createUserAndAssociateToAccount(
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
