import rootRtkQuery from "../rootRTKQuery";

const usersQueries = rootRtkQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery } = usersQueries;
