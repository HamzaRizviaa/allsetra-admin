import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { toast, types } from "@vilocnv/allsetra-core";

export const getAccountInstallationsThunk = createAsyncThunk(
  "accounts/getAccountInstallationsThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountInstallations(
        params,
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

export const removeInstallationFromAccountThunk = createAsyncThunk(
  "accounts/removeInstallationFromAccountThunk",
  async ({ accountId, installationId }: any) => {
    try {
      const response = await Accounts.removeInstallationFromAccount(
        accountId,
        installationId
      );

      if (response.status === 202) {
        toast.success(
          "Installation removing request is being processed by the backend."
        );
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
