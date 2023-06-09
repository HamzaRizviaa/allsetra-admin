import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AzureMsal } from "app/data/services";

const rootRtkQuery = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,

    prepareHeaders: async (headers) => {
      try {
        const accessTokenResponse = await AzureMsal.acquireToken();

        if (accessTokenResponse) {
          headers.set("Content-Type", "application/json");
          headers.set("Authorization", `bearer ${accessTokenResponse.idToken}`);
          headers.set(
            "X-Subscription",
            process.env.REACT_APP_API_HEADER_SUBSCRIPTION || ""
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        return headers;
      }
    },
  }),
  endpoints: () => ({}),
});

export default rootRtkQuery;
