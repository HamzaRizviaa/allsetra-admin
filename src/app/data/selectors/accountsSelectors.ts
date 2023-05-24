import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAccountsReducerLoading = (state: RootState) =>
  state.rootReducer.accountsReducer.loading;

export const selectActiveAccountId = (state: RootState) =>
  state.rootReducer.accountsReducer.activeAccountId;

export const selectAllAccounts = (state: RootState) =>
  state.rootReducer.accountsReducer.allAccounts;

export const selectAccountUsers = (state: RootState) =>
  state.rootReducer.accountsReducer.accountUsers;

export const selectActiveAccount = createSelector(
  selectAllAccounts,
  selectActiveAccountId,
  (accounts, accountId) => {
    return accounts.find((account: any) => account.id === accountId);
  }
);
