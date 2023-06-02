import axiosInstance from "app/axiosInstance";

class Dashboard {
  static getAllRoles = async () => {
    return await axiosInstance.get("/roles");
  };
}

export default Dashboard;
