import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";
import { IAlarmReportTheft, IAlarmSendEmail, IClearAlarm } from "../types";

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
}

export default AlarmDesk;
