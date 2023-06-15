import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubscriptionTypesThunk,
  getAllSubscriptionsThunk,
  getSpecificSubscriptionThunk,
  getSubscriptionsByQueryThunk,
} from "./subscriptionsActions";
import { act } from "react-dom/test-utils";
import { ISubscription } from "app/data/types/subscriptionManagerTypes";

export interface ISubscriptionState {
  loading: boolean;
  specificSubscriptionLoading: boolean;
  totalSubscriptions: number | null;
  subscriptions: Array<any>;
  subscriptionTypes: Array<any>;
  specificSubscription: ISubscription | null;
}

const initialState: ISubscriptionState = {
  loading: false,
  specificSubscriptionLoading: false,
  totalSubscriptions: null,
  subscriptions: [],
  subscriptionTypes: [],
  specificSubscription: null,
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Subscriptions Action Cases
    builder.addCase(getAllSubscriptionsThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllSubscriptionsThunk.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllSubscriptionsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Subscriptions By Querying Action Cases
    builder.addCase(getSubscriptionsByQueryThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSubscriptionsByQueryThunk.fulfilled, (state, action) => {
      state.subscriptions = action.payload?.results || [];
      state.totalSubscriptions = action.payload?.rowCount || 0;
      state.loading = false;
    });

    builder.addCase(getSubscriptionsByQueryThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Subscriptions By Querying Action Cases
    builder.addCase(getAllSubscriptionTypesThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllSubscriptionTypesThunk.fulfilled, (state, action) => {
      state.subscriptionTypes = action.payload || [];
      state.loading = false;
    });

    builder.addCase(getAllSubscriptionTypesThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get Specific Subscription Action Cases
    builder.addCase(getSpecificSubscriptionThunk.pending, (state) => {
      state.specificSubscriptionLoading = true;
    });

    builder.addCase(getSpecificSubscriptionThunk.fulfilled, (state, action) => {
      state.specificSubscription = action.payload;
      state.specificSubscriptionLoading = false;
    });

    builder.addCase(getSpecificSubscriptionThunk.rejected, (state) => {
      state.specificSubscriptionLoading = false;
    });
  },
});

export * from "./subscriptionsActions";
export default subscriptionsSlice.reducer;
