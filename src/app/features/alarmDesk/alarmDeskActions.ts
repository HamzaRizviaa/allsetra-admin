import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlarmDesk } from "app/data/services";
import { setIsLockedOfAlarm, setAllAlarmsAsUnlocked } from "./alarmDeskSlice";
import { toast, types } from "@vilocnv/allsetra-core";
import {
  IAlarmReportTheft,
  IAlarmSendEmail,
  IAlarmSendSMS,
  IClearAlarm,
} from "app/data/types";

export const getAlarmsByQueryThunk = createAsyncThunk(
  "alarmDesk/getAlarmsByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await AlarmDesk.getAlarmsByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postLockAlarmThunk = createAsyncThunk(
  "alarmDesk/postLockAlarmThunk",
  async (alarmId: string, { dispatch }) => {
    try {
      const response = await AlarmDesk.postLockAlarm(alarmId);

      if (response.status === 202) {
        dispatch(setIsLockedOfAlarm({ alarmId, isLocked: true }));
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postUnlockAlarmThunk = createAsyncThunk(
  "alarmDesk/postUnlockAlarmThunk",
  async (alarmId: string, { dispatch }) => {
    try {
      const response = await AlarmDesk.postUnlockAlarm(alarmId);

      if (response.status === 202) {
        dispatch(setIsLockedOfAlarm({ alarmId, isLocked: false }));
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postUnlockAllAlarmsThunk = createAsyncThunk(
  "alarmDesk/postUnlockAllAlarmsThunk",
  async (_, { dispatch }) => {
    try {
      const response = await AlarmDesk.postUnlockAllAlarms();

      if (response.status === 202) {
        dispatch(setAllAlarmsAsUnlocked());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postAlarmReportTheftThunk = createAsyncThunk(
  "alarmDesk/postAlarmReportTheftThunk",
  async ({ alarmId, data }: { alarmId: string; data: IAlarmReportTheft }) => {
    try {
      const response = await AlarmDesk.postAlarmReportTheft(alarmId, data);

      if (response.status === 202) {
        toast.success("Theft has been reported");
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postClearAlarmThunk = createAsyncThunk(
  "alarmDesk/postClearAlarmThunk",
  async ({ alarmId, data }: { alarmId: string; data: IClearAlarm }) => {
    try {
      const response = await AlarmDesk.postClearAlarm(alarmId, data);

      if (response.status === 202) {
        toast.success("Alarm has been cleared");
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postAlarmSendEmailThunk = createAsyncThunk(
  "alarmDesk/postAlarmSendEmailThunk",
  async ({ alarmId, data }: { alarmId: string; data: IAlarmSendEmail }) => {
    try {
      const response = await AlarmDesk.postAlarmSendEmail(alarmId, data);

      if (response.status === 202) {
        toast.success("Email has been send for the alarm");
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const postAlarmSendSMSThunk = createAsyncThunk(
  "alarmDesk/postAlarmSendSMSThunk",
  async ({ alarmId, data }: { alarmId: string; data: IAlarmSendSMS }) => {
    try {
      const response = await AlarmDesk.postAlarmSendSMS(alarmId, data);

      if (response.status === 202) {
        toast.success("SMS has been send for the alarm");
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deleteCommentFromAlarmThunk = createAsyncThunk(
  "alarmDesk/deleteCommentFromAlarmThunk",
  async ({ alarmId, commentId }: { alarmId: string; commentId: string }) => {
    try {
      const response = await AlarmDesk.deleteCommentFromAlarm(
        alarmId,
        commentId
      );

      if (response.status === 202) {
        toast.success("Comment has been deleted from the alarm");
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
