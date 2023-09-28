import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { types } from "@vilocnv/allsetra-core";
import {
  getAllAccountsThunk,
  getAccountsByQueryThunk,
  getAccountsIndustriesThunk,
  getAccountsTypesThunk,
  getAccountAssociatedUsersThunk,
  getAccountServicesThunk,
  getAccountDeviceTypesThunk,
  getAccountObjectTypesThunk,
  getAccountObjectsThunk,
  getAccountDevicesThunk,
  getAccountInstallationsThunk,
  getSpecificAccountThunk,
  getAccountSubscriptionsBySearchThunk,
  getDeviceSubscriptionsConnectedtoObjectAndAccountThunk,
} from "./actions";
import { getAllAccountGroupsThunk } from "./actions/accountGroupsActions";

export interface IAccountsState {
  loading: boolean;

  // Accounts State
  totalAccounts: number | null;
  activeAccountId: string | null;
  activeAccount: types.IAccount | null;
  allAccounts: Array<any>;

  accountsIndustriesLoading: boolean;
  accountsIndustries: Array<any>;
  accountsTypesLoading: boolean;
  accountsTypes: Array<any>;

  // Account Details State
  activeTabIndex: number;
  totalRecords: number | null;
  accountUsers: Array<any>;
  accountServices: Array<any>;
  accountDeviceTypes: Array<any>;
  accountObjectTypes: Array<any>;
  accountObjects: Array<any>;
  accountDevices: Array<any>;
  accountInstallations: Array<any>;
  accountGroups: Array<any>;
  accountSubscriptions: Array<any>;
  accountDeviceSubscriptions: Array<any>;
}

const initialState: IAccountsState = {
  loading: false,

  totalAccounts: null,
  activeAccountId: null,
  activeAccount: null,
  allAccounts: [],

  accountsIndustriesLoading: false,
  accountsIndustries: [],
  accountsTypesLoading: false,
  accountsTypes: [],

  activeTabIndex: 0,
  totalRecords: null,
  accountUsers: [],
  accountServices: [],
  accountDeviceTypes: [],
  accountObjectTypes: [],
  accountObjects: [],
  accountDevices: [],
  accountInstallations: [],
  accountGroups: [],
  accountSubscriptions: [],
  accountDeviceSubscriptions: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setActiveAccountId: (state, action: PayloadAction<string | null>) => {
      state.activeAccountId = action.payload;
    },
    setActiveTabIndex: (state, action: PayloadAction<number>) => {
      state.activeTabIndex = action.payload;
    },
    resetActiveAccountState: (state) => {
      state.activeAccountId = null;
      state.activeAccount = null;
      state.activeTabIndex = 0;
    },
  },
  extraReducers: (builder) => {
    // Get All Accounts Action Cases
    builder.addCase(getAllAccountsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllAccountsThunk.fulfilled, (state, action) => {
      state.allAccounts = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllAccountsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Accounts By Querying Action Cases
    builder.addCase(getAccountsByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountsByQueryThunk.fulfilled, (state, action) => {
      state.allAccounts = action.payload?.results || [];
      state.totalAccounts = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountsByQueryThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Specific Account Action Cases
    builder.addCase(getSpecificAccountThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSpecificAccountThunk.fulfilled, (state, action) => {
      state.activeAccount = action.payload;
      state.loading = false;
    });

    builder.addCase(getSpecificAccountThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Accounts Industries Thunk Action Cases
    builder.addCase(getAccountsIndustriesThunk.pending, (state) => {
      state.accountsIndustriesLoading = true;
    });

    builder.addCase(getAccountsIndustriesThunk.fulfilled, (state, action) => {
      state.accountsIndustries = action.payload;
      state.accountsIndustriesLoading = false;
    });

    builder.addCase(getAccountsIndustriesThunk.rejected, (state) => {
      state.accountsIndustriesLoading = false;
    });

    // Get Accounts Types Thunk Action Cases
    builder.addCase(getAccountsTypesThunk.pending, (state) => {
      state.accountsTypesLoading = true;
    });

    builder.addCase(getAccountsTypesThunk.fulfilled, (state, action) => {
      state.accountsTypes = action.payload;
      state.accountsTypesLoading = false;
    });

    builder.addCase(getAccountsTypesThunk.rejected, (state) => {
      state.accountsTypesLoading = false;
    });

    // Get Account Users Action Cases
    builder.addCase(getAccountAssociatedUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getAccountAssociatedUsersThunk.fulfilled,
      (state, action) => {
        state.accountUsers = action.payload?.results || [];
        state.totalRecords = action.payload?.rowCount || 0;
        state.loading = false;
      }
    );

    builder.addCase(getAccountAssociatedUsersThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Services Action Cases
    builder.addCase(getAccountServicesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountServicesThunk.fulfilled, (state, action) => {
      state.accountServices = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountServicesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Device Types Action Cases
    builder.addCase(getAccountDeviceTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountDeviceTypesThunk.fulfilled, (state, action) => {
      state.accountDeviceTypes = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountDeviceTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Object Types Action Cases
    builder.addCase(getAccountObjectTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountObjectTypesThunk.fulfilled, (state, action) => {
      state.accountObjectTypes = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountObjectTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Objecs Action Cases
    builder.addCase(getAccountObjectsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountObjectsThunk.fulfilled, (state, action) => {
      state.accountObjects = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountObjectsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Devices Action Cases
    builder.addCase(getAccountDevicesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountDevicesThunk.fulfilled, (state, action) => {
      state.accountDevices = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountDevicesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Installations Action Cases
    builder.addCase(getAccountInstallationsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountInstallationsThunk.fulfilled, (state, action) => {
      state.accountInstallations = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAccountInstallationsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All Account Groups Action Cases
    builder.addCase(getAllAccountGroupsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllAccountGroupsThunk.fulfilled, (state, action) => {
      state.accountGroups = action.payload || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAllAccountGroupsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Subscriptions Action Cases
    builder.addCase(getAccountSubscriptionsBySearchThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getAccountSubscriptionsBySearchThunk.fulfilled,
      (state, action) => {
        state.accountSubscriptions = action.payload?.results || [];
        state.totalRecords = action.payload?.rowCount || 0;
        state.loading = false;
      }
    );

    builder.addCase(getAccountSubscriptionsBySearchThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Account Device Subscriptions Action Cases
    builder.addCase(
      getDeviceSubscriptionsConnectedtoObjectAndAccountThunk.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      getDeviceSubscriptionsConnectedtoObjectAndAccountThunk.fulfilled,
      (state, action) => {
        state.accountDeviceSubscriptions = action.payload?.results || [];
        state.totalRecords = action.payload?.rowCount || 0;
        state.loading = false;
      }
    );

    builder.addCase(
      getDeviceSubscriptionsConnectedtoObjectAndAccountThunk.rejected,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export * from "./actions";
export * from "./accountsQueries";
export const {
  setActiveAccountId,
  setActiveTabIndex,
  resetActiveAccountState,
} = accountsSlice.actions;

export default accountsSlice.reducer;
