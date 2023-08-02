import axiosInstance from "app/axiosInstance";
import { types } from "@vilocnv/allsetra-core";

class Accounts {
  // Account Endpoints
  static getAllAccounts = async () => {
    return await axiosInstance.get("/accounts");
  };

  static getSpecificAccount = async (accountId: string) => {
    return await axiosInstance.get(`/accounts/${accountId}`);
  };

  static getAccountsByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/accounts/search", data);
  };

  static createAccount = async (data: any) => {
    return await axiosInstance.post("/accounts", data);
  };

  static updateAccount = async (accountId: string, data: any) => {
    return await axiosInstance.patch(`/accounts/${accountId}`, data);
  };

  static deactivateAccount = async (accountId: string) => {
    return await axiosInstance.delete(`/accounts/${accountId}`);
  };

  static reactivateAccount = async (accountId: string) => {
    return await axiosInstance.patch(`/accounts/${accountId}/activate`);
  };

  // Account Users Endpoints
  static getAccountAssociatedUsers = async (accountId: string) => {
    return await axiosInstance.get(`/accounts/${accountId}/users`);
  };

  static getAvailableUsersForAccount = async (accountId: string) => {
    return await axiosInstance.get(
      `/accounts/${accountId}/users/available-users`
    );
  };

  static getAccountsIndustries = async () => {
    return await axiosInstance.get("/accounts/industries");
  };

  static getAccountsTypes = async () => {
    return await axiosInstance.get("/accounts/types");
  };

  static createUserAndAssociateToAccount = async (
    accountId: string,
    data: any
  ) => {
    return await axiosInstance.post(`/accounts/${accountId}/users`, data);
  };

  static associateUserToAccount = async (
    accountId: string,
    userId: string,
    data: any
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/users/${userId}`,
      data
    );
  };

  static removeUserFromAccount = async (accountId: string, userId: string) => {
    return await axiosInstance.delete(`/accounts/${accountId}/users/${userId}`);
  };

  // Account Services Endpoints
  static getAccountServices = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/services/search`,
      data
    );
  };

  static assignServiceToAccount = async (accountId: string, data: any) => {
    return await axiosInstance.post(`/accounts/${accountId}/services`, data);
  };

  static removeServiceFromAccount = async (
    accountId: string,
    serviceId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/services/${serviceId}`
    );
  };

  // Account Device Types Endpoints
  static getAccountDeviceTypes = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/devicetypes/search`,
      data
    );
  };

  static assignDeviceTypeToAccount = async (accountId: string, data: any) => {
    return await axiosInstance.post(`/accounts/${accountId}/devicetypes`, data);
  };

  static removeDeviceTypeFromAccount = async (
    accountId: string,
    devicetypeId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/devicetypes/${devicetypeId}`
    );
  };

  // Account Object Types Endpoints
  static getAccountObjectTypes = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/objecttypes/search`,
      data
    );
  };

  static assignObjectTypeToAccount = async (accountId: string, data: any) => {
    return await axiosInstance.post(`/accounts/${accountId}/objecttypes`, data);
  };

  static removeObjectTypeFromAccount = async (
    accountId: string,
    objectTypeId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/objecttypes/${objectTypeId}`
    );
  };

  // Account Objects Endpoints
  static getAccountObjects = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/objects/search`,
      data
    );
  };

  static removeObjectFromAccount = async (
    accountId: string,
    objectId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/objects/${objectId}`
    );
  };

  // Account Installations Endpoints
  static getAccountInstallations = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/installations/search`,
      data
    );
  };

  static removeInstallationFromAccount = async (
    accountId: string,
    installationId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/installations/${installationId}`
    );
  };

  // Account Devices Endpoints
  static getAccountDevices = async (
    data: types.IRecordsAggregationBody,
    accountId: string
  ) => {
    return await axiosInstance.post(
      `/accounts/${accountId}/devices/search`,
      data
    );
  };

  static removeDeviceFromAccount = async (
    accountId: string,
    deviceId: string
  ) => {
    return await axiosInstance.delete(
      `/accounts/${accountId}/devices/${deviceId}`
    );
  };
}

export default Accounts;
