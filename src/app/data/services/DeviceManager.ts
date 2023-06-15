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

  // Device Types Profiles Endpoints

  static getDeviceTypesProfiles = async (
    data: types.IRecordsAggregationBody,
    deviceTypeId: string
  ) => {
    return await axiosInstance.post(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/search`,
      data
    );
  };

  static removeProfileFromDeviceType = async (
    deviceTypeId: string,
    deviceTypeProfileId: string
  ) => {
    return await axiosInstance.delete(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/${deviceTypeProfileId}`
    );
  };
}

export default DeviceManager;
