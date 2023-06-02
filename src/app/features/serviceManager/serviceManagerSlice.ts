import { createSlice } from "@reduxjs/toolkit";
import { getServicesByQueryThunk } from "./serviceManagerActions";

export interface IServiceManagerState {
  loading: boolean;
  totalServices: number | null;
  services: Array<any>;
}

const initialState: IServiceManagerState = {
  loading: false,
  totalServices: null,
  services: [],
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
  },
});

export * from "./serviceManagerActions";
export const {} = serviceManagerSlice.actions;
export default serviceManagerSlice.reducer;
