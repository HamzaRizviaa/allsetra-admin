import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCurrenciesThunk,
  getAllRolesThunk,
  getAllIconsThunk,
  getAllCountriesThunk,
  getAllPaymentMethodsThunk,
  getLoggedInUserThunk,
} from "./dashboardActions";

export interface IDashboardState {
  loading: boolean;
  idToken: string | null;
  userEmail: string | null;
  account: any;
  isDrawerCollapsed: boolean;

  roles: Array<any>;
  currencies: Array<any>;
  icons: Array<any>;
  countries: Array<any>;
  paymentMethods: Array<any>;
}

const initialState: IDashboardState = {
  loading: false,
  idToken: null,
  userEmail: null,
  account: null,
  isDrawerCollapsed: false,

  roles: [],
  currencies: [],
  icons: [],
  countries: [],
  paymentMethods: [],
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
    setDashboardAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload;
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

    // Get All Countries Action Cases
    builder.addCase(getAllCountriesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCountriesThunk.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllCountriesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All Payment Methods Action Cases
    builder.addCase(getAllPaymentMethodsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllPaymentMethodsThunk.fulfilled, (state, action) => {
      state.paymentMethods = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllPaymentMethodsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get getLoggedInUserThunk Action Cases
    builder.addCase(getLoggedInUserThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLoggedInUserThunk.fulfilled, (state, action) => {
      state.account = action.payload;
      state.loading = false;
    });

    builder.addCase(getLoggedInUserThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./dashboardActions";
export const {
  setIdToken,
  setUserEmail,
  setDrawerCollapseState,
  setDashboardAccount,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
