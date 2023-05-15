import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDashboardState {
  isDrawerCollapsed: boolean;
}

const initialState: IDashboardState = {
  isDrawerCollapsed: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDrawerCollapseState: (state, action: PayloadAction<boolean>) => {
      state.isDrawerCollapsed = action.payload;
    },
  },
});

export const { setDrawerCollapseState } = dashboardSlice.actions;
export default dashboardSlice.reducer;

