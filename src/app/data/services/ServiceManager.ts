import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";

class ServiceManager {
  static getAllServices = async () => {
    return await axiosInstance.get("/services");
  };

  static getServicesByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/services/search", data);
  };

  static getSpecificServiceById = async (serviceId: string) => {
    return await axiosInstance.get(`/Services/${serviceId}`);
  };

  static createService = async (data: any) => {
    return await axiosInstance.post("/services", data);
  };

  static updateService = async (serviceId: string, data: any) => {
    return await axiosInstance.patch(`/services/${serviceId}`, data);
  };

  static deactivateService = async (serviceId: string) => {
    return await axiosInstance.delete(`/services/${serviceId}`);
  };

  static activateService = async (serviceId: string) => {
    return await axiosInstance.patch(`/services/${serviceId}/activate`);
  };
}

export default ServiceManager;
