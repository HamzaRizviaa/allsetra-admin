import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllObjectTypesThunk,
  getObjectTypesByQueryThunk,
} from "./objectTypesActions";

export interface IObjectTypesState {
  loading: boolean;

  // ObjectTypes State
  totalObjectTypes: number | null;
  allObjectTypes: Array<any>;

  // Account Users State
  objectTypes: Array<any>;
}

const initialState: IObjectTypesState = {
  loading: false,
  totalObjectTypes: null,
  allObjectTypes: [],
  objectTypes: [],
};

const objectTypesSlice = createSlice({
  name: "objectTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Accounts Action Cases
    builder.addCase(getAllObjectTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllObjectTypesThunk.fulfilled, (state, action) => {
      state.allObjectTypes = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllObjectTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Accounts By Querying Action Cases
    builder.addCase(getObjectTypesByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getObjectTypesByQueryThunk.fulfilled, (state, action) => {
      state.allObjectTypes = action.payload?.results || [];
      state.totalObjectTypes = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getObjectTypesByQueryThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./objectTypesActions";

export default objectTypesSlice.reducer;
