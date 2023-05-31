import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllAccountsThunk,
  getAccountsByQueryThunk,
  getAccountAssociatedUsersThunk,
} from "./accountsActions";

export interface IAccountsState {
  loading: boolean;

  // Accounts State
  totalAccounts: number | null;
  activeAccountId: string | null;
  allAccounts: Array<any>;

  // Account Users State
  accountUsers: Array<any>;
}

const initialState: IAccountsState = {
  loading: false,
  totalAccounts: null,
  activeAccountId: null,
  allAccounts: [],
  accountUsers: [],
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

    // Get Accounts Users Action Cases
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
  },
});

export * from "./accountsActions";
export const { setActiveAccountId } = accountsSlice.actions;

export default accountsSlice.reducer;
