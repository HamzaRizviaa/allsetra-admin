import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAccountsReducerLoading = (state: RootState) =>
  state.rootReducer.accountsReducer.loading;

// Accounts State Selectors
export const selectTotalAccounts = (state: RootState) =>
  state.rootReducer.accountsReducer.totalAccounts;

export const selectActiveAccountId = (state: RootState) =>
  state.rootReducer.accountsReducer.activeAccountId;

export const selectAllAccounts = (state: RootState) =>
  state.rootReducer.accountsReducer.allAccounts;

export const selectActiveAccount = createSelector(
  selectAllAccounts,
  selectActiveAccountId,
  (accounts, accountId) => {
    return accounts.find((account: any) => account.id === accountId);
  }
);

export const selectAccountsState = createSelector(
  selectAccountsReducerLoading,
  selectTotalAccounts,
  selectActiveAccountId,
  selectAllAccounts,
  (loading, totalAccounts, activeAccountId, allAccounts) => ({
    loading,
    totalAccounts,
    activeAccountId,
    allAccounts,
  })
);

// Account Users Selectors
export const selectAccountUsers = (state: RootState) =>
  state.rootReducer.accountsReducer.accountUsers;
