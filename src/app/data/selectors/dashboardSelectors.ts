import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectDashboardReducerLoading = (state: RootState) =>
  state.rootReducer.dashboardReducer.loading;

export const selectIdToken = (state: RootState) =>
  state.rootReducer.dashboardReducer.idToken;

export const selectUserEmail = (state: RootState) =>
  state.rootReducer.dashboardReducer.userEmail;

export const selectActiveUserDetails = createSelector(
  selectIdToken,
  selectUserEmail,
  (idToken, userEmail) => ({ idToken, userEmail })
);

export const selectIsDrawerCollapsed = (state: RootState) =>
  state.rootReducer.dashboardReducer.isDrawerCollapsed;

export const selectAllRoles = (state: RootState) =>
  state.rootReducer.dashboardReducer.roles;

export const selectAllCurrencies = (state: RootState) =>
  state.rootReducer.dashboardReducer.currencies;

export const selectAllIcons = (state: RootState) =>
  state.rootReducer.dashboardReducer.icons;

export const selectAllCountries = (state: RootState) =>
  state.rootReducer.dashboardReducer.countries;

export const selectAllPaymentMethods = (state: RootState) =>
  state.rootReducer.dashboardReducer.paymentMethods;

export const selectIconState = createSelector(
  selectDashboardReducerLoading,
  selectAllIcons,
  (loading, icons) => ({
    loading,
    icons,
  })
);

export const selectDashboardCurrenciesState = createSelector(
  selectDashboardReducerLoading,
  selectAllCurrencies,
  (loading, currencies) => ({
    loading,
    currencies,
  })
);

export const selectDashboardCountriesState = createSelector(
  selectDashboardReducerLoading,
  selectAllCountries,
  (loading, countries) => ({
    loading,
    countries,
  })
);

export const selectDashboardPaymentMethodsState = createSelector(
  selectDashboardReducerLoading,
  selectAllPaymentMethods,
  (loading, paymentMethods) => ({
    loading,
    paymentMethods,
  })
);
