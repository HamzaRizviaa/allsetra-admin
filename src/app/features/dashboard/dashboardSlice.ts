import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCurrenciesThunk,
  getAllRolesThunk,
  getAllIconsThunk,
} from "./dashboardActions";

export interface IDashboardState {
  loading: boolean;
  idToken: string | null;
  userEmail: string | null;
  isDrawerCollapsed: boolean;
  roles: Array<any>;
  currencies: Array<any>;
  icons: Array<any>;
}

const initialState: IDashboardState = {
  loading: false,
  idToken: null,
  userEmail: null,
  isDrawerCollapsed: false,
  roles: [],
  currencies: [],
  icons: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string | null>) => {
      state.idToken = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
    setDrawerCollapseState: (state, action: PayloadAction<boolean>) => {
      state.isDrawerCollapsed = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get All Roles Action Cases
    builder.addCase(getAllRolesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllRolesThunk.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllRolesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All Currencies Action Cases
    builder.addCase(getAllCurrenciesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCurrenciesThunk.fulfilled, (state, action) => {
      state.currencies = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllCurrenciesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All Icons Action Cases
    builder.addCase(getAllIconsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllIconsThunk.fulfilled, (state, action) => {
      state.icons = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllIconsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./dashboardActions";
export const { setIdToken, setUserEmail, setDrawerCollapseState } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
