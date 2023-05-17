import axiosInstance from "app/axiosInstance";

class AccountsService {
  // Account Endpoints
  static getAllAccounts = async () => {
    return await axiosInstance.get("/clients");
  };

  static createAccount = async (data: any) => {
    return await axiosInstance.post("/clients", data);
  };

  static updateAccount = async (accountId: string, data: any) => {
    return await axiosInstance.patch(`/clients/${accountId}`, data);
  };

  static deactivateAccount = async (accountId: string) => {
    return await axiosInstance.delete(`/clients/${accountId}`);
  };

  static reactivateAccount = async (accountId: string) => {
    return await axiosInstance.patch(`/clients/${accountId}/activate`);
  };

  // Account Users Endpoints
  static getAccountUsers = async (accountId: string) => {
    return await axiosInstance.get(`/clients/${accountId}/users`);
  };

  static removeAccountUser = async (accountId: string, userId: string) => {
    return await axiosInstance.delete(`/clients/${accountId}/users/${userId}`);
  };
}

export default AccountsService;
