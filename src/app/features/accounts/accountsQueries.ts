import rootRtkQuery from "../rootRTKQuery";

const accountsQueries = rootRtkQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableServicesForAccount: builder.query<any, string | null>({
      query: (accountId) =>
        `/accounts/${accountId}/services/available-services`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getAvailableDeviceTypesForAccount: builder.query<any, string | null>({
      query: (accountId) =>
        `/accounts/${accountId}/devicetypes/available-devicetypes`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getAvailableObjectTypesForAccount: builder.query<any, string | null>({
      query: (accountId) =>
        `/accounts/${accountId}/objecttypes/available-objecttypes`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableServicesForAccountQuery,
  useGetAvailableDeviceTypesForAccountQuery,
  useGetAvailableObjectTypesForAccountQuery,
} = accountsQueries;
