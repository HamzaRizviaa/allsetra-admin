import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "@vilocnv/allsetra-core";
import { Accounts } from "app/data/services";

export const getAllAccountGroupsThunk = createAsyncThunk(
  "accounts/getAllAccountGroupsThunk",
  async (accountId: string) => {
    try {
      const response = await Accounts.getAllAccountGroups(accountId);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createOrUpdateAccountGroupsThunk = createAsyncThunk(
  "accounts/createOrUpdateAccountGroupsThunk",
  async ({ accountId, values, groupId }: any, { dispatch }) => {
    try {
      const response = values.uniqueId
        ? await Accounts.updateAccountGroups(accountId, groupId, values)
        : await Accounts.createAccountGroups(accountId, values);

      if (response.status === 202) {
        values.uniqueId
          ? toast.success(
              `Account Group updation request is being processed by the backend.`
            )
          : toast.success(
              `Account Group creation request is being processed by the backend.`
            );
        dispatch(getAllAccountGroupsThunk(accountId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const removeGroupFromAccountThunk = createAsyncThunk(
  "accounts/removeGroupFromAccountThunk",
  async ({ accountId, groupId }: any, { dispatch }) => {
    try {
      const response = await Accounts.removeGroupFromAccount(
        accountId,
        groupId
      );

      if (response.status === 202) {
        toast.success("Group has been removed from the account");
        dispatch(getAllAccountGroupsThunk(accountId));
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
