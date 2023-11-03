import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDevicesThunk,
  getAllSubscriptionsByDeviceIdThunk,
  getDeviceLocationHistoryThunk,
  getDevicesByQueryThunk,
  getSpecificDeviceThunk,
} from "./devicesActions";
import { IDevices } from "app/data/types";

export interface IDevicesState {
  loading: boolean;
  totalDevices: number | null;

  devices: Array<any>;
  deviceLocationHistory: Array<any>;
  specificDevice: IDevices | null;

  deviceSubscriptions: Array<any>;
  deviceSubscriptionsLoading: boolean;
}

const initialState: IDevicesState = {
  loading: false,
  totalDevices: null,
  devices: [],
  deviceLocationHistory: [],
  specificDevice: null,
  deviceSubscriptions: [],
  deviceSubscriptionsLoading: false,
};

const DevicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setActiveDevice: (state, action) => {
      state.specificDevice = action.payload;
    },
    resetSpecificDevice: (state) => {
      state.specificDevice = null;
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

    // Get All devices Action Cases
    builder.addCase(getAllDevicesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllDevicesThunk.fulfilled, (state, action) => {
      state.devices = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllDevicesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Devies By Querying Action Cases
    builder.addCase(getDevicesByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDevicesByQueryThunk.fulfilled, (state, action) => {
      state.devices = action.payload?.results || [];
      state.totalDevices = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getDevicesByQueryThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Specific Device Action Cases
    builder.addCase(getSpecificDeviceThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSpecificDeviceThunk.fulfilled, (state, action) => {
      state.specificDevice = action.payload;
      state.loading = false;
    });

    builder.addCase(getSpecificDeviceThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Subscriptions of Device By ID Thunk
    builder.addCase(getAllSubscriptionsByDeviceIdThunk.pending, (state) => {
      state.deviceSubscriptionsLoading = true;
    });

    builder.addCase(
      getAllSubscriptionsByDeviceIdThunk.fulfilled,
      (state, action) => {
        state.deviceSubscriptions = action.payload;
        state.deviceSubscriptionsLoading = false;
      }
    );

    builder.addCase(getAllSubscriptionsByDeviceIdThunk.rejected, (state) => {
      state.deviceSubscriptionsLoading = false;
    });
  },
});

export * from "./devicesActions";
export const { setActiveDevice, resetSpecificDevice } = DevicesSlice.actions;

export default DevicesSlice.reducer;
