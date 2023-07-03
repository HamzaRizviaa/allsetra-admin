import { createAsyncThunk } from "@reduxjs/toolkit";
import Objects from "app/data/services/Objects";

export const getAllObjectsThunk = createAsyncThunk(
  "objects/getAllObjectsThunk",
  async () => {
    try {
      const response = await Objects.getAllObjects();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
