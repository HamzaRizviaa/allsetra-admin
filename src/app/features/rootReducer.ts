import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";

const rootReducer = combineReducers({ dashboardReducer, accountsReducer });

export default rootReducer;
