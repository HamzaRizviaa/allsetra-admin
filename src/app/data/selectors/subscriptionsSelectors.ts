import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectSubscriptionsReducerLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.loading;

// Subscriptions State Selectors
export const selectTotalSubscriptions = (state: RootState) =>
  state.rootReducer.subscriptionReducer.totalSubscriptions;

export const selectTotalSubscriptionsLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.totalSubscriptionsLoading;

export const selectAllSubscriptions = (state: RootState) =>
  state.rootReducer.subscriptionReducer.subscriptions;

export const selectAllSubscriptionTypes = (state: RootState) =>
  state.rootReducer.subscriptionReducer.subscriptionTypes;

export const selectSpecificSubscription = (state: RootState) =>
  state.rootReducer.subscriptionReducer.specificSubscription;

export const selectSpecificSubscriptionLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.specificSubscriptionLoading;

export const selectTotalDeviceSubscriptions = (state: RootState) =>
  state.rootReducer.subscriptionReducer.totalDeviceSubscriptions;

export const selectTotalDeviceSubscriptionsLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.totalDeviceSubscriptionsLoading;

export const selectAllSubscriptionPageDeviceSubscriptions = (
  state: RootState
) => state.rootReducer.subscriptionReducer.deviceSubscriptions;

export const selectSubscriptionsState = createSelector(
  selectSubscriptionsReducerLoading,
  selectTotalSubscriptions,
  selectAllSubscriptions,
  selectAllSubscriptionTypes,
  selectSpecificSubscription,
  selectSpecificSubscriptionLoading,
  selectTotalSubscriptionsLoading,
  (
    loading,
    totalSubscriptions,
    allSubscriptions,
    subscriptionTypes,
    specificSubscription,
    specificSubscriptionLoading,
    totalSubscriptionsLoading
  ) => ({
    loading,
    totalSubscriptions,
    allSubscriptions,
    subscriptionTypes,
    specificSubscription,
    specificSubscriptionLoading,
    totalSubscriptionsLoading,
  })
);

export const selectDeviceSubscriptionsState = createSelector(
  selectTotalDeviceSubscriptions,
  selectAllSubscriptionPageDeviceSubscriptions,
  selectTotalDeviceSubscriptionsLoading,
  (
    totalDeviceSubscriptions,
    deviceSubscriptions,
    totalDeviceSubscriptionsLoading
  ) => ({
    totalDeviceSubscriptions,
    deviceSubscriptions,
    totalDeviceSubscriptionsLoading,
  })
);
