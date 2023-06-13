import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFieldsThunk,
  getAllFieldTypesThunk,
  getFieldsByQueryThunk,
  getSpecificFieldThunk,
} from "./fieldsActions";

export interface IFieldsState {
  loading: boolean;
  specificFieldLoading: boolean;

  // Fields State
  totalFields: number | null;
  fields: Array<any>;
  specificField: Object | null;

  //Field Types
  fieldTypes: Array<any>;
}

const initialState: IFieldsState = {
  loading: false,
  totalFields: null,
  fields: [],
  fieldTypes: [],
  specificField: null,
  specificFieldLoading: false,
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    resetSpecificField: (state) => {
      state.specificField = null;
    },
  },
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

    // Get Specific Field Action Cases
    builder.addCase(getSpecificFieldThunk.pending, (state) => {
      state.specificFieldLoading = true;
    });

    builder.addCase(getSpecificFieldThunk.fulfilled, (state, action) => {
      state.specificField = action.payload;
      state.specificFieldLoading = false;
    });

    builder.addCase(getSpecificFieldThunk.rejected, (state) => {
      state.specificFieldLoading = false;
    });

    //Get Field Types Action Cases
    builder.addCase(getAllFieldTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllFieldTypesThunk.fulfilled, (state, action) => {
      state.fieldTypes = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllFieldTypesThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetSpecificField } = fieldsSlice.actions;

export * from "./fieldsActions";
export default fieldsSlice.reducer;
