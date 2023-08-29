import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAlarmDeskReducerLoading = (state: RootState) =>
  state.rootReducer.alarmDeskReducer.loading;

// Accounts State Selectors
export const selectAlarmsTotalRecords = (state: RootState) =>
  state.rootReducer.alarmDeskReducer.totalRecords;

export const selectActiveAlarmId = (state: RootState) =>
  state.rootReducer.alarmDeskReducer.activeAlarmId;

export const selectAlarms = (state: RootState) =>
  state.rootReducer.alarmDeskReducer.alarms;

export const selectSpecificAlarm = (state: RootState) =>
  state.rootReducer.alarmDeskReducer.specificAlarm;

export const selectAlarmDeskState = createSelector(
  selectAlarmDeskReducerLoading,
  selectAlarmsTotalRecords,
  selectActiveAlarmId,
  selectAlarms,
  selectSpecificAlarm,
  (loading, totalRecords, activeAlarmId, alarms, specificAlarm) => ({
    loading,
    totalRecords,
    activeAlarmId,
    alarms,
    specificAlarm,
  })
);
