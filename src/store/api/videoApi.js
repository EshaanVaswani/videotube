import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const videoApi = createApi({
   reducerPath: "videoApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/videos/`,
      credentials: "include",
   }),
   tagTypes: ["Videos", "VideoStats"],
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
         providesTags: (result, error, id) => [{ type: "Videos", id }],
         transformResponse: (response) => response.data,
      }),
      getVideoStats: builder.query({
         query: (videoId) => ({
            url: `/stats/${videoId}`,
         }),
         providesTags: (result, id) => [{ type: "VideoStats", id }],
      }),
      viewVideo: builder.mutation({
         query: (videoId) => ({
            url: `/view/${videoId}`,
            method: "PATCH",
         }),
         providesTags: (result, error, id) => [{ type: "VideoStats", id }],
      }),
   }),
});

export const useGetVideoData = (videoId) => {
   const { data: video, isLoading, error } = useGetVideoByIdQuery(videoId);
   const { data: stats } = useGetVideoStatsQuery(videoId);

   return {
      video: video
         ? {
              ...video,
              ...(stats || {}),
           }
         : null,
      isLoading,
      error,
   };
};

export const {
   usePublishVideoMutation,
   useGetVideosQuery,
   useGetVideoByIdQuery,
   useViewVideoMutation,
   useGetVideoStatsQuery,
} = videoApi;
