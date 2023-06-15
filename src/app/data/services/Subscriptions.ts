import axiosInstance from "app/axiosInstance";

class Subscriptions {
  static getAllSubscriptions = async () => {
    return await axiosInstance.get("/subscriptions");
  };

  static getSpecificSubscription = async (subscriptionId: string) => {
    return await axiosInstance.get(`/subscriptions/${subscriptionId}`);
  };

  static getSubscriptionsByQuery = async (data: any) => {
    return await axiosInstance.post("/subscriptions/search", data);
  };

  static createSubscription = async (data: any) => {
    return await axiosInstance.post("/subscriptions", data);
  };

  static updateSubscription = async (subscriptionId: string, data: any) => {
    return await axiosInstance.patch(`/subscriptions/${subscriptionId}`, data);
  };

  static deactivateSubscription = async (subscriptionId: string) => {
    return await axiosInstance.delete(`/subscriptions/${subscriptionId}`);
  };

  static reactivateSubscription = async (subscriptionId: string) => {
    return await axiosInstance.patch(
      `/subscriptions/${subscriptionId}/activate`
    );
  };

  static getAllSubscriptionTypes = async () => {
    return await axiosInstance.get("/subscriptionTypes");
  };
}

export default Subscriptions;
