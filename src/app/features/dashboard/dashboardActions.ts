import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dashboard } from "app/data/services";

export const getAllRolesThunk = createAsyncThunk(
  "dashboard/getAllRolesThunk",
  async () => {
    try {
      const response = await Dashboard.getAllRoles();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllCurrenciesThunk = createAsyncThunk(
  "dashboard/getAllCurrenciesThunk",
  async () => {
    try {
      const response = await Dashboard.getAllCurrencies();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllIconsThunk = createAsyncThunk(
  "dashboard/getAllIconsThunk",
  async () => {
    try {
      const response = await Dashboard.getAllIcons();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllCountriesThunk = createAsyncThunk(
  "dashboard/getAllCountriesThunk",
  async () => {
    try {
      const response = await Dashboard.getAllCountries();

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllPaymentMethodsThunk = createAsyncThunk(
  "dashboard/getAllPaymentMethodsThunk",
  async () => {
    try {
      const response = await Dashboard.getAllPaymentMethods();

      if (response.status === 200) {
        return response.data;
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
