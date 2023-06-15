import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast, types } from "@vilocnv/allsetra-core";
import Subscriptions from "app/data/services/Subscriptions";

export const getAllSubscriptionsThunk = createAsyncThunk(
  "subscriptions/getAllSubscriptionsThunk",
  async () => {
    try {
      const response = await Subscriptions.getAllSubscriptions();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSubscriptionsByQueryThunk = createAsyncThunk(
  "subscriptions/getSubscriptionsByQueryThunk",
  async (params: types.IRecordsAggregationBody) => {
    try {
      const response = await Subscriptions.getSubscriptionsByQuery(params);

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const deactivateSubscriptionThunk = createAsyncThunk(
  "subscriptions/deactivateSubscriptionThunk",
  async (subscriptionId: string, { dispatch }) => {
    try {
      const response = await Subscriptions.deactivateSubscription(
        subscriptionId
      );

      if (response.status === 202) {
        toast.success("Subscription has been deactivated");
        dispatch(getAllSubscriptionsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const reactivateSubscriptionThunk = createAsyncThunk(
  "subscriptions/reactivateSubscriptionThunk",
  async (subscriptionId: string, { dispatch }) => {
    try {
      const response = await Subscriptions.reactivateSubscription(
        subscriptionId
      );

      if (response.status === 202) {
        toast.success("Subscription has been reactivated");
        dispatch(getAllSubscriptionsThunk());
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const createOrUpdateSubscriptionThunk = createAsyncThunk(
  "subscriptions/createOrUpdateSubscriptionThunk",
  async (data: any) => {
    try {
      const response = data.uniqueId
        ? await Subscriptions.updateSubscription(data.uniqueId, data)
        : await Subscriptions.createSubscription(data);

      if (response.status === 202) {
        data.uniqueId
          ? toast.success("Subscription has been updated")
          : toast.success("Subscription has been created");
      }

      return response;
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getAllSubscriptionTypesThunk = createAsyncThunk(
  "subscriptions/getAllSubscriptionTypesThunk",
  async () => {
    try {
      const response = await Subscriptions.getAllSubscriptionTypes();

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);

export const getSpecificSubscriptionThunk = createAsyncThunk(
  "subscriptions/getSpecificSubscriptionThunk",
  async (subscriptionId: string) => {
    try {
      const response = await Subscriptions.getSpecificSubscription(
        subscriptionId
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }
);
