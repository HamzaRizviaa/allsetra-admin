import { createSlice } from "@reduxjs/toolkit";
import { types } from "@vilocnv/allsetra-core";
import { getDeviceLocationHistoryThunk } from "./devicesActions";

export interface IDevicesState {
  loading: boolean;
  totalRecords: number | null;
  allDevices: Array<any>;
  devices: Array<any>;
  activeDevice: types.IDevice | null;
  deviceLocationHistory: Array<any>;
}

const initialState: IDevicesState = {
  loading: false,
  totalRecords: null,
  allDevices: [],
  devices: [],
  activeDevice: null,
  deviceLocationHistory: [],
};

const DevicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setActiveDevice: (state, action) => {
      state.activeDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Device Location History Action Cases
    builder.addCase(getDeviceLocationHistoryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceLocationHistoryThunk.fulfilled,
      (state, action) => {
        state.deviceLocationHistory = action.payload || [];
        state.loading = false;
      }
    );

    builder.addCase(getDeviceLocationHistoryThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./devicesActions";
export const { setActiveDevice } = DevicesSlice.actions;

export default DevicesSlice.reducer;
