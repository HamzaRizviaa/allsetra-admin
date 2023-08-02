import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAccountsReducerLoading = (state: RootState) =>
  state.rootReducer.accountsReducer.loading;

// Accounts State Selectors
export const selectTotalAccounts = (state: RootState) =>
  state.rootReducer.accountsReducer.totalAccounts;

export const selectActiveAccountId = (state: RootState) =>
  state.rootReducer.accountsReducer.activeAccountId;

export const selectActiveAccount = (state: RootState) =>
  state.rootReducer.accountsReducer.activeAccount;

export const selectAllAccounts = (state: RootState) =>
  state.rootReducer.accountsReducer.allAccounts;

export const selectActiveAccountState = createSelector(
  selectAccountsReducerLoading,
  selectActiveAccountId,
  selectActiveAccount,
  (state: RootState) => state.rootReducer.accountsReducer.activeTabIndex,
  (loading, activeAccountId, activeAccount, activeTabIndex) => ({
    loading,
    activeAccountId,
    activeAccount,
    activeTabIndex,
  })
);

export const selectAccountsState = createSelector(
  selectAccountsReducerLoading,
  selectTotalAccounts,
  selectActiveAccount,
  selectAllAccounts,
  (loading, totalAccounts, account, allAccounts) => ({
    loading,
    totalAccounts,
    account,
    allAccounts,
  })
);

// Account Details Selectors
export const selectAccountActiveTabIndex = (state: RootState) =>
  state.rootReducer.accountsReducer.activeTabIndex;

export const selectAccountTotalRecords = (state: RootState) =>
  state.rootReducer.accountsReducer.totalRecords;

export const selectAccountUsers = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountUsers,
  (loading, totalRecords, accountUsers) => ({
    loading,
    totalRecords,
    accountUsers,
  })
);

export const selectAccountServices = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountServices,
  (loading, totalRecords, accountServices) => ({
    loading,
    totalRecords,
    accountServices,
  })
);

export const selectAccountDeviceTypes = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountDeviceTypes,
  (loading, totalRecords, accountDeviceTypes) => ({
    loading,
    totalRecords,
    accountDeviceTypes,
  })
);

export const selectAccountObjectTypes = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountObjectTypes,
  (loading, totalRecords, accountObjectTypes) => ({
    loading,
    totalRecords,
    accountObjectTypes,
  })
);

export const selectAccountObjects = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountObjects,
  (loading, totalRecords, accountObjects) => ({
    loading,
    totalRecords,
    accountObjects,
  })
);

export const selectAccountDevices = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountDevices,
  (loading, totalRecords, accountDevices) => ({
    loading,
    totalRecords,
    accountDevices,
  })
);

export const selectAccountInstallations = createSelector(
  selectAccountsReducerLoading,
  selectAccountTotalRecords,
  (state: RootState) => state.rootReducer.accountsReducer.accountInstallations,
  (loading, totalRecords, accountInstallations) => ({
    loading,
    totalRecords,
    accountInstallations,
  })
);
