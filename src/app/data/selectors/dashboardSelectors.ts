import { RootState } from "app/store";

export const selectIsDrawerCollapsed = (state: RootState) =>
  state.rootReducer.dashboardReducer.isDrawerCollapsed;

export const selectAllRoles = (state: RootState) =>
  state.rootReducer.dashboardReducer.roles;
