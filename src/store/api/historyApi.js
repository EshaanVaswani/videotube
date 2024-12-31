import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const historyApi = createApi({
   reducerPath: "historyApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/users/`,
      credentials: "include",
   }),
   tagTypes: ["History"],
   endpoints: (builder) => ({
      getWatchHistory: builder.query({
         query: () => ({
            url: "/watch-history",
         }),
         providesTags: ["History"],
         transformResponse: (response) => response.data,
      }),
      removeVideoFromHistory: builder.mutation({
         query: (videoId) => ({
            url: `/watch-history/${videoId}`,
            method: "PATCH",
         }),
         invalidatesTags: ["History"],
      }),
      clearWatchHistory: builder.mutation({
         query: () => ({
            url: "/watch-history",
            method: "PATCH",
         }),
         invalidatesTags: ["History"],
      }),
   }),
});

export const {
   useGetWatchHistoryQuery,
   useRemoveVideoFromHistoryMutation,
   useClearWatchHistoryMutation,
} = historyApi;
