import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDeviceTypesThunk,
  getDeviceTypesByQueryThunk,
} from "./deviceManagerActions";

export interface IDeviceManagerState {
  loading: boolean;
  totalDeviceTypes: number | null;
  deviceTypes: Array<any>;
}

const initialState: IDeviceManagerState = {
  loading: false,
  totalDeviceTypes: null,
  deviceTypes: [],
};

const deviceManagerSlice = createSlice({
  name: "deviceManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All DeviceTypes Action Cases
    builder.addCase(getAllDeviceTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllDeviceTypesThunk.fulfilled, (state, action) => {
      state.deviceTypes = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllDeviceTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes by Querying Action Cases
    builder.addCase(getDeviceTypesByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDeviceTypesByQueryThunk.fulfilled, (state, action) => {
      state.totalDeviceTypes = action.payload?.rowCount || 0;
      state.deviceTypes = action.payload?.results || [];
      state.loading = false;
    });

    builder.addCase(getDeviceTypesByQueryThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./deviceManagerActions";
export const {} = deviceManagerSlice.actions;
export default deviceManagerSlice.reducer;
