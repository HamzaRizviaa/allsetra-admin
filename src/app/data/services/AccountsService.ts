import axiosInstance from "app/axiosInstance";

class AccountsService {
  // Account Endpoints
  static getAllAccounts = async () => {
    return await axiosInstance.get("/accounts");
  };

  static getSpecificAccount = async (accountId: string) => {
    return await axiosInstance.get(`/accounts/${accountId}`);
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
}

export default AccountsService;
