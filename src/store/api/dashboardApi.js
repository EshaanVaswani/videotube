import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const dashboardApi = createApi({
   reducerPath: "dashboardApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/dashboard/`,
      credentials: "include",
   }),
   tagTypes: ["Dashboard"],
   endpoints: (builder) => ({
      getChannelVideos: builder.query({
         query: () => ({
            url: `/videos`,
         }),
         providesTags: ["Dashboard"],
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetChannelVideosQuery } = dashboardApi;
