import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectSubscriptionsReducerLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.loading;

// Subscriptions State Selectors
export const selectTotalSubscriptions = (state: RootState) =>
  state.rootReducer.subscriptionReducer.totalSubscriptions;

export const selectAllSubscriptions = (state: RootState) =>
  state.rootReducer.subscriptionReducer.subscriptions;

export const selectAllSubscriptionTypes = (state: RootState) =>
  state.rootReducer.subscriptionReducer.subscriptionTypes;

export const selectSpecificSubscription = (state: RootState) =>
  state.rootReducer.subscriptionReducer.specificSubscription;

export const selectSpecificSubscriptionLoading = (state: RootState) =>
  state.rootReducer.subscriptionReducer.specificSubscriptionLoading;

export const selectSubscriptionsState = createSelector(
  selectSubscriptionsReducerLoading,
  selectTotalSubscriptions,
  selectAllSubscriptions,
  selectAllSubscriptionTypes,
  selectSpecificSubscription,
  selectSpecificSubscriptionLoading,
  (
    loading,
    totalSubscriptions,
    allSubscriptions,
    subscriptionTypes,
    specificSubscription,
    specificSubscriptionLoading
  ) => ({
    loading,
    totalSubscriptions,
    allSubscriptions,
    subscriptionTypes,
    specificSubscription,
    specificSubscriptionLoading,
  })
);