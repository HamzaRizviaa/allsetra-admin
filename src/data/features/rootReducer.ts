import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const rootReducer = combineReducers({ counterReducer });

export default rootReducer;
