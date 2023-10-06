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

  // Device Types Details Endpoints

  static updateDeviceType = async (deviceTypeId: string, data: any) => {
    return await axiosInstance.patch(`/deviceTypes/${deviceTypeId}`, data);
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

  static getDeviceTypesProfileDataPoints = async (deviceTypeId: string) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/data-points`
    );
  };

  static getDeviceTypesProfileIdentifiers = async (
    deviceTypeId: string,
    fieldId: string
  ) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/data-points/${fieldId}`
    );
  };

  static getDeviceTypesProfileTriggerModes = async (deviceTypeId: string) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/trigger-modes`
    );
  };

  static getDeviceTypesProfileEnvironments = async (deviceTypeId: string) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/environments`
    );
  };

  static getDeviceTypesProfileInputPins = async (deviceTypeId: string) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/input-pins`
    );
  };

  static getDeviceTypesProfileOutputPins = async (deviceTypeId: string) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/related-data/output-pins`
    );
  };

  static createDeviceTypeProfile = async (deviceTypeId: string, data: any) => {
    return await axiosInstance.post(
      `/deviceTypes/${deviceTypeId}/deviceprofiles`,
      data
    );
  };

  static updateDeviceTypeProfile = async (deviceTypeId: string, data: any) => {
    return await axiosInstance.patch(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/${data.uniqueId}`,
      data
    );
  };

  static getSpecificDeviceProfile = async (
    deviceTypeId: string,
    deviceTypeProfileId: string
  ) => {
    return await axiosInstance.get(
      `/deviceTypes/${deviceTypeId}/deviceprofiles/${deviceTypeProfileId}`
    );
  };
  // Device Types Modules Endpoints

  static getDeviceTypesModules = async (
    data: types.IRecordsAggregationBody,
    deviceTypeId: string
  ) => {
    return await axiosInstance.post(
      `/devicetypes/${deviceTypeId}/devicemodules/search`,
      data
    );
  };
}

export default DeviceManager;
