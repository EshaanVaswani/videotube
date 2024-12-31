import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const likeApi = createApi({
   reducerPath: "likeApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/likes/`,
      credentials: "include",
   }),
   tagTypes: ["Likes", "VideoStats", "Comments", "Tweets", "Videos"],
   endpoints: (builder) => ({
      toggleVideoLike: builder.mutation({
         query: (videoId) => ({
            url: `/toggle/v/${videoId}`,
            method: "POST",
         }),
         invalidatesTags: (result, error, videoId) => [
            { type: "VideoStats", id: videoId },
            "Likes",
         ],
      }),
      toggleCommentLike: builder.mutation({
         query: (commentId) => ({
            url: `/toggle/c/${commentId}`,
            method: "POST",
         }),
         invalidatesTags: (result, error, commentId) => [
            { type: "Comments", id: commentId },
            "Likes",
         ],
      }),
      toggleTweetLike: builder.mutation({
         query: (tweetId) => ({
            url: `/toggle/t/${tweetId}`,
            method: "POST",
         }),
         invalidatesTags: (result, error, tweetId) => [
            { type: "Tweets", id: tweetId },
            "Likes",
         ],
      }),
      getLikedVideos: builder.query({
         query: () => ({
            url: "/videos",
         }),
         providesTags: ["Likes", "Videos"],
         transformResponse: (response) => response.data,
      }),
   }),
});

export const {
   useToggleVideoLikeMutation,
   useToggleCommentLikeMutation,
   useToggleTweetLikeMutation,
   useGetLikedVideosQuery,
} = likeApi;
