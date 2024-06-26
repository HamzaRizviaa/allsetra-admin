import { types } from "@vilocnv/allsetra-core";
import axiosInstance from "app/axiosInstance";

class Objects {
  static getAllObjects = async () => {
    return await axiosInstance.get("/objects");
  };

  static getObjectsByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/objects/search", data);
  };

  static getSpecificObjectById = async (objectId: string) => {
    return await axiosInstance.get(`/objects/${objectId}`);
  };

  static postUpdateObject = async (data: any) => {
    return await axiosInstance.patch(`/objects/${data.uniqueId}`, data);
  };

  static disconnectDeviceFromObject = async (
    objectId: string,
    deviceId: string
  ) => {
    return await axiosInstance.delete(
      `/objects/${objectId}/devices/${deviceId}`
    );
  };

  static getAllSubscriptionsByObjectId = async (objectId: string) => {
    return await axiosInstance.get(`/objects/${objectId}/subscriptions`);
  };

  static getObjectsLocations = async (
    accountId: string,
    data: types.IAdminMapFilter
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/objects/locations`,
      data
    );
  };
}

export default Objects;
