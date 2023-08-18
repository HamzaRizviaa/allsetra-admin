import { createAsyncThunk } from "@reduxjs/toolkit";
import { Accounts } from "app/data/services";
import { types } from "@vilocnv/allsetra-core";

export const getAccountSubscriptionsBySearchThunk = createAsyncThunk(
  "accounts/getAccountSubscriptionsBySearchThunk",
  async ({
    params,
    accountId,
  }: {
    params: types.IRecordsAggregationBody;
    accountId: string;
  }) => {
    try {
      const response = await Accounts.getAccountSubscriptionsBySearch(
        params,
        accountId
      );

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
