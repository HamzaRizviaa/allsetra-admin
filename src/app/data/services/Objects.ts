import { types } from "@vilocnv/allsetra-core";
import axiosInstance from "app/axiosInstance";

class Objects {
  static getAllObjects = async () => {
    return await axiosInstance.get("/objects");
  };

  static getObjectsByQuery = async (data: types.IRecordsAggregationBody) => {
    return await axiosInstance.post("/objects/search", data);
  };

  static getSpecificObjectById = async (objectId: string) => {
    return await axiosInstance.get(`/objects/${objectId}`);
  };
}

export default Objects;
