import { createSlice } from "@reduxjs/toolkit";
import { types } from "@vilocnv/allsetra-core";
import {
  getAllObjectsThunk,
  getAllSubscriptionsByObjectIdThunk,
  getObjectsByQueryThunk,
  getObjectsLocationsThunk,
  getSpecificObjectByIdThunk,
} from "./objectsActions";

export interface IObjectState {
  loading: boolean;
  totalRecords: number | null;
  activeObject: types.IObject | null;
  allObjects: Array<any>;
  objects: Array<any>;
  objectSubscriptions: Array<any>;
  objectSubscriptionsLoading: boolean;
}

const initialState: IObjectState = {
  loading: false,
  totalRecords: null,
  activeObject: null,
  allObjects: [],
  objects: [],
  objectSubscriptions: [],
  objectSubscriptionsLoading: false,
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

    // Get Subscriptions of Object By ID Thunk
    builder.addCase(getAllSubscriptionsByObjectIdThunk.pending, (state) => {
      state.objectSubscriptionsLoading = true;
    });

    builder.addCase(
      getAllSubscriptionsByObjectIdThunk.fulfilled,
      (state, action) => {
        state.objectSubscriptions = action.payload;
        state.objectSubscriptionsLoading = false;
      }
    );

    builder.addCase(getAllSubscriptionsByObjectIdThunk.rejected, (state) => {
      state.objectSubscriptionsLoading = false;
    });

    // Get Specifc Object By ID Thunk
    builder.addCase(getObjectsLocationsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getObjectsLocationsThunk.fulfilled, (state, action) => {
      state.allObjects = action.payload;
      state.loading = false;
    });

    builder.addCase(getObjectsLocationsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./objectsActions";
export const { setActiveObject } = objectsSlice.actions;

export default objectsSlice.reducer;
