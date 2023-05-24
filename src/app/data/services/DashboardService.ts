import axiosInstance from "app/axiosInstance";

class DashboardService {
  static getAllRoles = async () => {
    return await axiosInstance.get("/roles");
  };
}

export default DashboardService;
