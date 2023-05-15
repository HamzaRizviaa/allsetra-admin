import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";

const rootReducer = combineReducers({ dashboardReducer });

export default rootReducer;
