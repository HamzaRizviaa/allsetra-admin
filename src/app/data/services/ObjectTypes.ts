import axiosInstance from "app/axiosInstance";

class ObjectTypes {
  // ObjectType Endpoints

  static getAllObjectTypes = async () => {
    return await axiosInstance.get("/objectTypes");
  };

  static getObjectTypesByQuery = async (data: any) => {
    return await axiosInstance.post("/objectTypes/search", data);
  };

  static createObjectType = async (data: any) => {
    return await axiosInstance.post("/objectTypes", data);
  };

  static updateObjectType = async (objectTypeId: string, data: any) => {
    return await axiosInstance.patch(`/objectTypes/${objectTypeId}`, data);
  };

  static deactivateObjectType = async (objectTypeID: string) => {
    return await axiosInstance.delete(`/objectTypes/${objectTypeID}`);
  };

  static reactivateObjectType = async (objectTypeID: string) => {
    return await axiosInstance.patch(`/objectTypes/${objectTypeID}/activate`);
  };
}

export default ObjectTypes;
