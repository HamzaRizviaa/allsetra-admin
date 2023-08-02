import rootRtkQuery from "../rootRTKQuery";

const accountsQueries = rootRtkQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAccountsIndustries: builder.query<void, void>({
      query: () => '/accounts/industries',
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getAccountsTypes: builder.query<void, void>({
      query: () => '/accounts/types',
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getAvailableUsersForAccount: builder.query<any, string | null>({
      query: (accountId) => `/accounts/${accountId}/users/available-users`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
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
  useGetAccountsIndustriesQuery,
  useGetAccountsTypesQuery,
  useGetAvailableUsersForAccountQuery,
  useGetAvailableServicesForAccountQuery,
  useGetAvailableDeviceTypesForAccountQuery,
  useGetAvailableObjectTypesForAccountQuery,
} = accountsQueries;
