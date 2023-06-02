import axiosInstance from "app/axiosInstance";

class FieldsService {
  static getAllFields = async () => {
    return await axiosInstance.get("/fields");
  };

  static getSpecificField = async (fieldId: string) => {
    return await axiosInstance.get(`/fields/${fieldId}`);
  };

  static getFieldsByQuery = async (data: any) => {
    return await axiosInstance.post("/fields/search", data);
  };

  static createField = async (data: any) => {
    return await axiosInstance.post("/fields", data);
  };

  static updateField = async (fieldId: string, data: any) => {
    return await axiosInstance.patch(`/fields/${fieldId}`, data);
  };

  static deactivateField = async (fieldId: string) => {
    return await axiosInstance.delete(`/fields/${fieldId}`);
  };

  static reactivateField = async (fieldId: string) => {
    return await axiosInstance.patch(`/fields/${fieldId}/activate`);
  };
}

export default FieldsService;
