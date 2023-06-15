import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";
import serviceManagerReducer from "./serviceManager/serviceManagerSlice";
import deviceManagerReducer from "./deviceManager/deviceManagerSlice";
import fieldsReducer from "./fields/fieldsSlice";
import subscriptionReducer from "./subscriptions/subscriptionsSlice";
import objectTypesReducer from "./objectTypes/objectTypesSlice";

const rootReducer = combineReducers({
  dashboardReducer,
  accountsReducer,
  serviceManagerReducer,
  deviceManagerReducer,
  fieldsReducer,
  subscriptionReducer,
  objectTypesReducer,
});

export default rootReducer;
