import axiosInstance from "app/axiosInstance";

class Objects {
  static getAllObjects = async () => {
    return await axiosInstance.get("/objects");
  };
}

export default Objects;
