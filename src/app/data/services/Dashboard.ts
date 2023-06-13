import axiosInstance from "app/axiosInstance";

class Dashboard {
  static getAllRoles = async () => {
    return await axiosInstance.get("/roles");
  };

  static getAllIcons = async () => {
    return await axiosInstance.get("/icons");
  };
}

export default Dashboard;
