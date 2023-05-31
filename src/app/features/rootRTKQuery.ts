import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const rootRtkQuery = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      // if no auth needed remove the token
      if (headers.has("No-Auth")) {
        headers.delete("Authorization");
        headers.delete("No-Auth");
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default rootRtkQuery;
