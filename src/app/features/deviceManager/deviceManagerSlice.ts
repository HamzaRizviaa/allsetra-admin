import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getAllDeviceTypesThunk,
  getDeviceTypesByQueryThunk,
  getDeviceTypesModulesThunk,
  getDeviceTypesProfileDataPoints,
  getDeviceTypesProfileEnvironments,
  getDeviceTypesProfileIdentifiers,
  getDeviceTypesProfileInputPins,
  getDeviceTypesProfileOutputPins,
  getDeviceTypesProfileTriggerModes,
  getDeviceTypesProfilesThunk,
  getSpecificDeviceProfileThunk,
} from "./deviceManagerActions";

export interface IDeviceManagerState {
  loading: boolean;
  totalDeviceTypes: number | null;
  deviceTypes: Array<any>;
  activeDeviceTypeId: string | null;
  totalRecords: number | null;
  deviceTypesProfiles: Array<any>;
  deviceTypesModules: Array<any>;
  deviceTypesProfilesDataPoints: Array<any>;
  deviceTypesProfilesIdentifiers: Array<any>;
  deviceTypesProfilesTriggerModes: Array<any>;
  deviceTypesProfilesEnvironments: Array<any>;
  deviceTypesProfilesInputPins: Array<any>;
  deviceTypesProfilesOutputPins: Array<any>;
  identifierLoading: boolean;
  specificDeviceTypeProfile: Object | null;
  allIdentifiers: Array<any>;
}

const initialState: IDeviceManagerState = {
  loading: false,
  totalDeviceTypes: null,
  deviceTypes: [],
  activeDeviceTypeId: null,
  totalRecords: null,
  deviceTypesProfiles: [],
  deviceTypesModules: [],
  deviceTypesProfilesDataPoints: [],
  deviceTypesProfilesIdentifiers: [],
  deviceTypesProfilesTriggerModes: [],
  deviceTypesProfilesEnvironments: [],
  deviceTypesProfilesInputPins: [],
  deviceTypesProfilesOutputPins: [],
  identifierLoading: false,
  specificDeviceTypeProfile: null,
  allIdentifiers: [],
};

const deviceManagerSlice = createSlice({
  name: "deviceManager",
  initialState,
  reducers: {
    setActiveDeviceTypeId: (state, action: PayloadAction<string | null>) => {
      state.activeDeviceTypeId = action.payload;
    },
    resetSpecificDeviceTypeProfile: (state) => {
      state.specificDeviceTypeProfile = null;
    },
    setUniqueIdentifiers: (state, action) => {
      const uniqueData = action.payload.filter(
        (v: any, i: any, a: any) =>
          a.findIndex((v2: any) => v2.id === v.id) === i
      );
      state.allIdentifiers = uniqueData;
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

    // Get DeviceTypes Profiles  Data points Action Cases
    builder.addCase(getDeviceTypesProfileDataPoints.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceTypesProfileDataPoints.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesDataPoints = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getDeviceTypesProfileDataPoints.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes Profiles  Identifiers Action Cases
    builder.addCase(getDeviceTypesProfileIdentifiers.pending, (state) => {
      state.identifierLoading = true;
    });

    builder.addCase(
      getDeviceTypesProfileIdentifiers.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesIdentifiers = action.payload;
        state.identifierLoading = false;
        state.allIdentifiers = state.allIdentifiers.length
          ? [...state.allIdentifiers, ...action.payload]
          : [...action.payload];
      }
    );

    builder.addCase(getDeviceTypesProfileIdentifiers.rejected, (state) => {
      state.identifierLoading = false;
    });

    // Get DeviceTypes Profiles  Trigger Modes Action Cases
    builder.addCase(getDeviceTypesProfileTriggerModes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceTypesProfileTriggerModes.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesTriggerModes = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getDeviceTypesProfileTriggerModes.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes Profiles  Environments Action Cases
    builder.addCase(getDeviceTypesProfileEnvironments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceTypesProfileEnvironments.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesEnvironments = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getDeviceTypesProfileEnvironments.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes Profiles  Input Pins Action Cases
    builder.addCase(getDeviceTypesProfileInputPins.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceTypesProfileInputPins.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesInputPins = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getDeviceTypesProfileInputPins.rejected, (state) => {
      state.loading = false;
    });

    // Get DeviceTypes Profiles  Output Pins Action Cases
    builder.addCase(getDeviceTypesProfileOutputPins.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDeviceTypesProfileOutputPins.fulfilled,
      (state, action) => {
        state.deviceTypesProfilesOutputPins = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getDeviceTypesProfileOutputPins.rejected, (state) => {
      state.loading = false;
    });

    // Get Specific DeviceTypes Profile Action Cases
    builder.addCase(getSpecificDeviceProfileThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getSpecificDeviceProfileThunk.fulfilled,
      (state, action) => {
        state.specificDeviceTypeProfile = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(getSpecificDeviceProfileThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./deviceManagerActions";
export const {
  setActiveDeviceTypeId,
  resetSpecificDeviceTypeProfile,
  setUniqueIdentifiers,
} = deviceManagerSlice.actions;
export default deviceManagerSlice.reducer;
