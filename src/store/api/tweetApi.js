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
      addTweet: builder.mutation({
         query: ({ content }) => ({
            url: "/",
            method: "POST",
            body: { content },
         }),
         invalidatesTags: ["Tweets"],
      }),
      updateTweet: builder.mutation({
         query: ({ tweetId, content }) => ({
            url: `/${tweetId}`,
            method: "PATCH",
            body: { content },
         }),
         invalidatesTags: ["Tweets"],
      }),
      deleteTweet: builder.mutation({
         query: (tweetId) => ({
            url: `/${tweetId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Tweets"],
      }),
   }),
});

export const {
   useGetUserTweetsQuery,
   useAddTweetMutation,
   useDeleteTweetMutation,
   useUpdateTweetMutation,
} = tweetApi;
