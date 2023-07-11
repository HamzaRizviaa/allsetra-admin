import axiosInstance from "app/axiosInstance";

class Settings {
  static getSpecificSetting = async () => {
    return await axiosInstance.get("/userSettings");
  };

  static updateSettings = async (data: any) => {
    return await axiosInstance.patch("/userSettings", data);
  };

  static resetPassword = async (data: any) => {
    return await axiosInstance.post("/userSettings/reset-password", data);
  };

  static getAllLanguages = async () => {
    return await axiosInstance.get("/userSettings/available-languages");
  };
}

export default Settings;
