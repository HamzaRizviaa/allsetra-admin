import axiosInstance from "app/axiosInstance";

class Dashboard {
  static getAllRoles = async () => {
    return await axiosInstance.get("/roles");
  };

  static getAllCurrencies = async () => {
    return await axiosInstance.get("/currencies");
  };

  static getAllIcons = async () => {
    return await axiosInstance.get("/icons");
  };
}

export default Dashboard;
