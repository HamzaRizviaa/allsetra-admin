import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";
import {
  IAlarmReportTheft,
  IAlarmSendEmail,
  IAlarmSendSMS,
  IClearAlarm,
} from "../types";

class AlarmDesk {
  static getAlarmsByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/alarms/search", data);
  };

  static postLockAlarm = async (alarmId: string) => {
    return await axiosInstance.post(`/alarms/${alarmId}/lock`);
  };

  static postUnlockAlarm = async (alarmId: string) => {
    return await axiosInstance.post(`/alarms/${alarmId}/unlock`);
  };

  static postUnlockAllAlarms = async () => {
    return await axiosInstance.post("/alarms/unlock-all");
  };

  static postAlarmReportTheft = async (
    alarmId: string,
    data: IAlarmReportTheft
  ) => {
    return await axiosInstance.post(`/alarms/${alarmId}/report-theft`, data);
  };

  static postClearAlarm = async (alarmId: string, data: IClearAlarm) => {
    return await axiosInstance.post(`/alarms/${alarmId}/clear-alarm`, data);
  };

  static postAlarmSendEmail = async (
    alarmId: string,
    data: IAlarmSendEmail
  ) => {
    return await axiosInstance.post(`/alarms/${alarmId}/send-email`, data);
  };

  static postAlarmSendSMS = async (alarmId: string, data: IAlarmSendSMS) => {
    return await axiosInstance.post(`/alarms/${alarmId}/send-sms`, data);
  };

  // Alarm Comments Endpoints
  static deleteCommentFromAlarm = async (
    alarmId: string,
    commentId: string
  ) => {
    return await axiosInstance.delete(
      `/alarms/${alarmId}/comments/${commentId}`
    );
  };
}

export default AlarmDesk;
