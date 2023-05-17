import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllAccountsThunk, getAccountUsersThunk } from "./accountsActions";

export interface ICustomersState {
  loading: boolean;
  activeAccountId: string | null;
  allAccounts: Array<any>;
  accountUsers: Array<any>;
}

const initialState: ICustomersState = {
  loading: false,
  activeAccountId: null,
  allAccounts: [],
  accountUsers: [],
};

const customersSlice = createSlice({
  name: "customers",
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

    // Get Customer Users Action Cases
    builder.addCase(getAccountUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAccountUsersThunk.fulfilled, (state, action) => {
      state.accountUsers = action.payload;
      state.loading = false;
    });

    builder.addCase(getAccountUsersThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./accountsActions";
export const { setActiveAccountId } = customersSlice.actions;

export default customersSlice.reducer;
