import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";

class AlarmDesk {
  static getAlarmsByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/alarms/search", data);
  };

  static alarmReportTheft = async (alarmId: string, data: any) => {
    return await axiosInstance.post(`/alarms/${alarmId}/report-theft`, data);
  };
}

export default AlarmDesk;
