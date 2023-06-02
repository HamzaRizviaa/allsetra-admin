import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";
import serviceManagerReducer from "./serviceManager/serviceManagerSlice";
import deviceManagerReducer from "./deviceManager/deviceManagerSlice";
import fieldsReducer from "./fields/fieldsSlice";

const rootReducer = combineReducers({
  dashboardReducer,
  accountsReducer,
  serviceManagerReducer,
  deviceManagerReducer,
  fieldsReducer,
});

export default rootReducer;
