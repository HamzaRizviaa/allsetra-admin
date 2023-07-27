import { types } from "@vilocnv/allsetra-core";
import axiosInstance from "app/axiosInstance";

class Devices {
  static getAllDevices = async () => {
    return await axiosInstance.get("/devices");
  };

  static getDevicesByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/devices/search", data);
  };

  static getSpecificDeviceById = async (deviceId: string) => {
    return await axiosInstance.get(`/devices/${deviceId}`);
  };

  static postUpdateDevice = async (data: any) => {
    return await axiosInstance.patch(`/devices/${data.uniqueId}`, data);
  };

  static getDeviceLocationHistory = async (
    deviceId: string,
    locationSearch: string
  ) => {
    return await axiosInstance.get(
      `/devices/${deviceId}/locations${locationSearch}`
    );
  };
}

export default Devices;
