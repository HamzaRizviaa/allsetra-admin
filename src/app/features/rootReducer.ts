import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";
import fieldsReducer from "./fields/fieldsSlice";

const rootReducer = combineReducers({
  dashboardReducer,
  accountsReducer,
  fieldsReducer,
});

export default rootReducer;
