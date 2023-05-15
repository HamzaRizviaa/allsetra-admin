import { RootState } from "app/store";

export const selectIsDrawerCollapsed = (state: RootState) =>
  state.rootReducer.dashboardReducer.isDrawerCollapsed;
