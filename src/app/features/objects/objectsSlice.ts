import { createSlice } from "@reduxjs/toolkit";
import {
  getAllObjectsThunk,
  getObjectsByQueryThunk,
  getSpecificObjectByIdThunk,
} from "./objectsActions";

export interface IObjectState {
  loading: boolean;
  totalRecords: number | null;
  activeObject: any;
  allObjects: Array<any>;
  objects: Array<any>;
}

const initialState: IObjectState = {
  loading: false,
  totalRecords: null,
  activeObject: null,
  allObjects: [],
  objects: [],
};

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    setActiveObject: (state, action) => {
      state.activeObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get All Objects Action Cases
    builder.addCase(getAllObjectsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllObjectsThunk.fulfilled, (state, action) => {
      state.allObjects = action.payload || [];
      state.loading = false;
    });

    builder.addCase(getAllObjectsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Objects By Query Thunk
    builder.addCase(getObjectsByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getObjectsByQueryThunk.fulfilled, (state, action) => {
      state.objects = action.payload?.results || [];
      state.totalRecords = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getObjectsByQueryThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Specifc Object By ID Thunk
    builder.addCase(getSpecificObjectByIdThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSpecificObjectByIdThunk.fulfilled, (state, action) => {
      state.activeObject = action.payload;
      state.loading = false;
    });

    builder.addCase(getSpecificObjectByIdThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./objectsActions";
export const { setActiveObject } = objectsSlice.actions;

export default objectsSlice.reducer;
