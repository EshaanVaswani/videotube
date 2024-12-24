import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const tweetApi = createApi({
   reducerPath: "tweetApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/tweets/`,
      credentials: "include",
   }),
   tagTypes: ["Tweets"],
   endpoints: (builder) => ({
      getUserTweets: builder.query({
         query: (userId) => ({
            url: `/user/${userId}`,
         }),
         providesTags: ["Tweets"],
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetUserTweetsQuery } = tweetApi;
