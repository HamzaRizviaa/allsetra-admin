import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlarmDesk } from "app/data/services";
import { types } from "@vilocnv/allsetra-core";

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
