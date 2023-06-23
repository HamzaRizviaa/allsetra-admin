import axiosInstance from "app/axiosInstance";

class Settings {
  static getSpecificSetting = async () => {
    return await axiosInstance.get("/userSettings");
  };

  static updateSettings = async (data: any) => {
    return await axiosInstance.patch("/userSettings", data);
  };
}

export default Settings;
