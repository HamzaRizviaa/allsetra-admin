import { createSlice } from "@reduxjs/toolkit";
import {
  getAllServicesThunk,
  getServicesByQueryThunk,
  getSpecificServiceByIdThunk,
} from "./serviceManagerActions";

export interface IServiceManagerState {
  loading: boolean;
  totalServices: number | null;
  services: Array<any>;
  allServices: Array<any>;
  specificServiceLoading: boolean;
  specificService: any;
}

const initialState: IServiceManagerState = {
  loading: false,
  totalServices: null,
  services: [],
  allServices: [],
  specificServiceLoading: false,
  specificService: null,
};

const serviceManagerSlice = createSlice({
  name: "serviceManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Services By Querying Action Cases
    builder.addCase(getServicesByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getServicesByQueryThunk.fulfilled, (state, action) => {
      state.totalServices = action.payload?.rowCount || 0;
      state.services = action.payload?.results || [];
      state.loading = false;
    });

    builder.addCase(getServicesByQueryThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get all Services Action Cases
    builder.addCase(getAllServicesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllServicesThunk.fulfilled, (state, action) => {
      state.allServices = action.payload || [];
      state.loading = false;
    });

    builder.addCase(getAllServicesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get specifc service by id
    builder.addCase(getSpecificServiceByIdThunk.pending, (state) => {
      state.specificServiceLoading = true;
    });

    builder.addCase(getSpecificServiceByIdThunk.fulfilled, (state, action) => {
      state.specificService = action.payload;
      state.specificServiceLoading = false;
    });

    builder.addCase(getSpecificServiceByIdThunk.rejected, (state) => {
      state.specificServiceLoading = false;
    });
  },
});

export * from "./serviceManagerActions";
export const {} = serviceManagerSlice.actions;
export default serviceManagerSlice.reducer;
