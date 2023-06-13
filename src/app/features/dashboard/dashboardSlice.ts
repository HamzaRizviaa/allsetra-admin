import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllIconsThunk, getAllRolesThunk } from "./dashboardActions";

export interface IDashboardState {
  loading: boolean;
  isDrawerCollapsed: boolean;
  roles: Array<any>;
  icons: Array<any>;
}

const initialState: IDashboardState = {
  loading: false,
  isDrawerCollapsed: false,
  roles: [],
  icons: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDrawerCollapseState: (state, action: PayloadAction<boolean>) => {
      state.isDrawerCollapsed = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get All Roles Action Cases
    builder.addCase(getAllRolesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllRolesThunk.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllRolesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All Icons Action Cases
    builder.addCase(getAllIconsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllIconsThunk.fulfilled, (state, action) => {
      state.icons = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllIconsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export * from "./dashboardActions";
export const { setDrawerCollapseState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
