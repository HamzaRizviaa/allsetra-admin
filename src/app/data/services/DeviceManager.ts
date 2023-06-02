import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";

class DeviceManager {
  // Device Types Endpoints
  static getAllDeviceTypes = async () => {
    return await axiosInstance.get("/deviceTypes");
  };

  static getDeviceTypesByQuery = async (
    data: types.IRecordsAggregationBody
  ) => {
    return await axiosInstance.post("/deviceTypes/search", data);
  };
}

export default DeviceManager;
