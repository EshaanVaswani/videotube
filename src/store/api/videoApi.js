import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const videoApi = createApi({
   reducerPath: "videoApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/videos/`,
      credentials: "include",
   }),
   tagTypes: ["Videos"],
   endpoints: (builder) => ({
      publishVideo: builder.mutation({
         query: (data) => ({
            url: "/",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Videos"],
      }),
      getVideos: builder.query({
         query: ({
            page = 1,
            limit = 10,
            query = "",
            userId = "",
            sortBy = "createdAt",
            sortType = "desc",
         }) => ({
            url: "/",
            params: { page, limit, query, userId, sortBy, sortType },
         }),
         providesTags: ["Videos"],
         transformResponse: (response) => response.data.docs,
      }),
      getVideoById: builder.query({
         query: (videoId) => ({
            url: `/${videoId}`,
         }),
         providesTags: ["Videos"],
         transformResponse: (response) => response.data,
      }),
      viewVideo: builder.mutation({
         query: (videoId) => ({
            url: `/view/${videoId}`,
            method: "PATCH",
         }),
      }),
   }),
});

export const {
   usePublishVideoMutation,
   useGetVideosQuery,
   useGetVideoByIdQuery,
   useViewVideoMutation,
} = videoApi;
