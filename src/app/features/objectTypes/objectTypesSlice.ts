import { createSlice } from "@reduxjs/toolkit";
import {
  getAllObjectTypesThunk,
  getObjectTypesByQueryThunk,
  getSpecificObjectThunk,
} from "./objectTypesActions";

export interface IObjectTypesState {
  loading: boolean;
  specificObjectLoading: boolean;

  // ObjectTypes State
  totalObjectTypes: number | null;
  allObjectTypes: Array<any>;
  objectTypes: Array<any>;
  objectTypesLoading: boolean;
  specificObject: Object | null;
}

const initialState: IObjectTypesState = {
  loading: false,
  totalObjectTypes: null,
  allObjectTypes: [],
  objectTypes: [],
  objectTypesLoading: false,
  specificObject: null,
  specificObjectLoading: false,
};

const objectTypesSlice = createSlice({
  name: "objectTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Objects Action Cases
    builder.addCase(getAllObjectTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllObjectTypesThunk.fulfilled, (state, action) => {
      state.allObjectTypes = action.payload || [];
      state.loading = false;
    });

    builder.addCase(getAllObjectTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Objects By Querying Action Cases
    builder.addCase(getObjectTypesByQueryThunk.pending, (state) => {
      state.objectTypesLoading = true;
    });

    builder.addCase(getObjectTypesByQueryThunk.fulfilled, (state, action) => {
      state.objectTypes = action.payload?.results || [];
      state.totalObjectTypes = action.payload?.rowCount || 0;
      state.objectTypesLoading = false;
    });

    builder.addCase(getObjectTypesByQueryThunk.rejected, (state) => {
      state.objectTypesLoading = false;
    });

    // Get Objects By Querying Action Cases
    builder.addCase(getSpecificObjectThunk.pending, (state) => {
      state.specificObjectLoading = true;
    });

    builder.addCase(getSpecificObjectThunk.fulfilled, (state, action) => {
      state.specificObject = action.payload;
      state.specificObjectLoading = false;
    });

    builder.addCase(getSpecificObjectThunk.rejected, (state) => {
      state.specificObjectLoading = false;
    });
  },
});

export * from "./objectTypesActions";
export default objectTypesSlice.reducer;
