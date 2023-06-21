import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAlarmsByQueryThunk } from "./alarmDeskActions";

export interface IAlarmDeskState {
  loading: boolean;

  // Accounts State
  totalRecords: number | null;
  activeAlarmId: string | null;
  alarms: Array<any>;
}

const initialState: IAlarmDeskState = {
  loading: false,
  totalRecords: null,
  activeAlarmId: null,
  alarms: [],
};

const alarmDeskSlice = createSlice({
  name: "alarmDesk",
  initialState,
  reducers: {
    setActiveAlarmId: (state, action: PayloadAction<string | null>) => {
      state.activeAlarmId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Accounts By Querying Action Cases
    builder.addCase(getAlarmsByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAlarmsByQueryThunk.fulfilled, (state, action) => {
      state.alarms = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getAlarmsByQueryThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./alarmDeskActions";
export const { setActiveAlarmId } = alarmDeskSlice.actions;

export default alarmDeskSlice.reducer;
