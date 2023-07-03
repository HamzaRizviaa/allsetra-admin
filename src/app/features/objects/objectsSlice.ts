import { createSlice } from "@reduxjs/toolkit";
import { getAllObjectsThunk } from "./objectsActions";

export interface IObjectState {
  loading: boolean;
  allObjects: Array<any>;
}

const initialState: IObjectState = {
  loading: false,
  allObjects: [],
};

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {},
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
  },
});

export * from "./objectsActions";
export default objectsSlice.reducer;
