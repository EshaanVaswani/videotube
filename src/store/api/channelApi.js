import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const channelApi = createApi({
   reducerPath: "channelApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/users/`,
      credentials: "include",
   }),
   tagTypes: ["Channel"],
   endpoints: (builder) => ({
      getChannelProfile: builder.query({
         query: (username) => `channel/${username}`,
         providesTags: ["Channel"],
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetChannelProfileQuery } = channelApi;
