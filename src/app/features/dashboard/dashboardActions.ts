import { createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardService } from "app/data/services";

export const getAllRolesThunk = createAsyncThunk(
  "dashboard/getAllRolesThunk",
  async () => {
    try {
      const response = await DashboardService.getAllRoles();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
