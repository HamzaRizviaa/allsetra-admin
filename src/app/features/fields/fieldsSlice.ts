import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllFieldsThunk, getFieldsByQueryThunk } from "./fieldsActions";

export interface IFieldsState {
  loading: boolean;

  // Fields State
  totalFields: number | null;
  fields: Array<any>;
}

const initialState: IFieldsState = {
  loading: false,
  totalFields: null,
  fields: [],
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Fields Action Cases
    builder.addCase(getAllFieldsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllFieldsThunk.fulfilled, (state, action) => {
      state.fields = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllFieldsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Fields By Querying Action Cases
    builder.addCase(getFieldsByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFieldsByQueryThunk.fulfilled, (state, action) => {
      state.fields = action.payload?.results || [];
      state.totalFields = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getFieldsByQueryThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./fieldsActions";
export default fieldsSlice.reducer;
