import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/dashboardSlice";
import accountsReducer from "./accounts/accountsSlice";
import serviceManagerReducer from "./serviceManager/serviceManagerSlice";
import deviceManagerReducer from "./deviceManager/deviceManagerSlice";
import fieldsReducer from "./fields/fieldsSlice";
import subscriptionReducer from "./subscriptions/subscriptionsSlice";
import objectTypesReducer from "./objectTypes/objectTypesSlice";
import settingsReducer from "./settings/settingsSlice";
import alarmDeskReducer from "./alarmDesk/alarmDeskSlice";
import objectsReducer from "./objects/objectsSlice";
import devicesReducer from "./devices/devicesSlice";

const rootReducer = combineReducers({
  dashboardReducer,
  accountsReducer,
  serviceManagerReducer,
  deviceManagerReducer,
  fieldsReducer,
  subscriptionReducer,
  objectTypesReducer,
  settingsReducer,
  alarmDeskReducer,
  objectsReducer,
  devicesReducer,
});

export default rootReducer;
