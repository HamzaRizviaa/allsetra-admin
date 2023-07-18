import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllAccountsThunk,
  getAccountsByQueryThunk,
  getAccountAssociatedUsersThunk,
  getAccountServicesThunk,
  getAccountDeviceTypesThunk,
  getAccountObjectTypesThunk,
  getAccountObjectsThunk,
  getAccountDevicesThunk,
  getAccountInstallationsThunk,
} from "./actions";

export interface IAccountsState {
  loading: boolean;

  // Accounts State
  totalAccounts: number | null;
  activeAccountId: string | null;
  allAccounts: Array<any>;

  // Account Details State
  totalRecords: number | null;
  accountUsers: Array<any>;
  accountServices: Array<any>;
  accountDeviceTypes: Array<any>;
  accountObjectTypes: Array<any>;
  accountObjects: Array<any>;
  accountDevices: Array<any>;
  accountInstallations: Array<any>;
}

const initialState: IAccountsState = {
  loading: false,

  totalAccounts: null,
  activeAccountId: null,
  allAccounts: [],

  totalRecords: null,
  accountUsers: [],
  accountServices: [],
  accountDeviceTypes: [],
  accountObjectTypes: [],
  accountObjects: [],
  accountDevices: [],
  accountInstallations: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setActiveAccountId: (state, action: PayloadAction<string | null>) => {
      state.activeAccountId = action.payload;
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

    // Get Account Users Action Cases
    builder.addCase(getAccountAssociatedUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getAccountAssociatedUsersThunk.fulfilled,
      (state, action) => {
        state.accountUsers = action.payload;
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
  },
});

export * from "./actions";
export * from "./accountsQueries";
export const { setActiveAccountId } = accountsSlice.actions;

export default accountsSlice.reducer;
