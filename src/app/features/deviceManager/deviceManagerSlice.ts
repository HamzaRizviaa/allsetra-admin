import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getAllDeviceTypesThunk,
  getDeviceTypesByQueryThunk,
  getDeviceTypesModulesThunk,
  getDeviceTypesProfilesThunk,
} from "./deviceManagerActions";

export interface IDeviceManagerState {
  loading: boolean;
  totalDeviceTypes: number | null;
  deviceTypes: Array<any>;
  activeDeviceTypeId: string | null;
  totalRecords: number | null;
  deviceTypesProfiles: Array<any>;
  deviceTypesModules: Array<any>;
}

const initialState: IDeviceManagerState = {
  loading: false,
  totalDeviceTypes: null,
  deviceTypes: [],
  activeDeviceTypeId: null,
  totalRecords: null,
  deviceTypesProfiles: [],
  deviceTypesModules: [],
};

const deviceManagerSlice = createSlice({
  name: "deviceManager",
  initialState,
  reducers: {
    setActiveDeviceTypeId: (state, action: PayloadAction<string | null>) => {
      state.activeDeviceTypeId = action.payload;
    },
  },
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

    // Get DeviceTypes Profiles Action Cases
    builder.addCase(getDeviceTypesProfilesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDeviceTypesProfilesThunk.fulfilled, (state, action) => {
      state.totalRecords = action.payload?.rowCount || 0;
      state.deviceTypesProfiles = action.payload?.results || [];
      state.loading = false;
    });

    builder.addCase(getDeviceTypesProfilesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes Modules Action Cases
    builder.addCase(getDeviceTypesModulesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDeviceTypesModulesThunk.fulfilled, (state, action) => {
      state.totalRecords = action.payload?.rowCount || 0;
      state.deviceTypesModules = action.payload?.results || [];
      state.loading = false;
    });

    builder.addCase(getDeviceTypesModulesThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./deviceManagerActions";
export const { setActiveDeviceTypeId } = deviceManagerSlice.actions;
export default deviceManagerSlice.reducer;
