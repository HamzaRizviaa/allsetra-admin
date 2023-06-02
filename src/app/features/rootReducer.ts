import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";
import serviceManagerReducer from "./serviceManager/serviceManagerSlice";
import deviceManagerReducer from "./deviceManager/deviceManagerSlice";

const rootReducer = combineReducers({
  dashboardReducer,
  accountsReducer,
  serviceManagerReducer,
  deviceManagerReducer,
});

export default rootReducer;
