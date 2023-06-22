import rootRtkQuery from "../rootRTKQuery";

const alarmDeskQueries = rootRtkQuery.injectEndpoints({
  endpoints: (builder) => ({
    getAlarmAssociatedComments: builder.query<any, string | null>({
      query: (alarmId) => `/alarms/${alarmId}/comments`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getAlarmPersonsForAlarm: builder.query<any, string | null>({
      query: (alarmId) => `/alarms/${alarmId}/alarmpersons`,
      transformResponse: (response: any) => {
        return response;
      },
    }),
    getClearAlarmReasons: builder.query({
      query: () => "/clearalarmreasons",
      transformResponse: (response: any) => {
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAlarmAssociatedCommentsQuery,
  useGetAlarmPersonsForAlarmQuery,
  useGetClearAlarmReasonsQuery,
} = alarmDeskQueries;
