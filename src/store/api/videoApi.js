import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const videoApi = createApi({
   reducerPath: "videoApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/videos/`,
      credentials: "include",
   }),
   tagTypes: ["Videos", "VideoStats", "Video"],
   endpoints: (builder) => ({
      uploadFiles: builder.mutation({
         query: (data) => ({
            url: "/upload-files",
            method: "POST",
            body: data,
         }),
         transformResponse: (response) => response.data,
      }),
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
         providesTags: (result, error, id) => [{ type: "Video", id }],
         transformResponse: (response) => response.data,
      }),
      getVideoStats: builder.query({
         query: (videoId) => ({
            url: `/stats/${videoId}`,
         }),
         providesTags: (result, id) => [{ type: "VideoStats", id }],
      }),
      viewVideo: builder.mutation({
         query: ({ videoId, sessionId, watchTime }) => ({
            url: `/view/${videoId}`,
            method: "POST",
            body: { sessionId, watchTime },
         }),
         providesTags: (result, error, { videoId }) => [
            { type: "VideoStats", id: videoId },
         ],
      }),
      togglePublishStatus: builder.mutation({
         query: (videoId) => ({
            url: `/toggle/publish/${videoId}`,
            method: "PATCH",
         }),
         invalidatesTags: ["Videos"],
      }),
      updateVideo: builder.mutation({
         query: ({ videoId, data }) => ({
            url: `/${videoId}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["Videos"],
      }),
      deleteVideo: builder.mutation({
         query: (videoId) => ({
            url: `/${videoId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Videos"],
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
   useUploadFilesMutation,
   usePublishVideoMutation,
   useGetVideosQuery,
   useGetVideoByIdQuery,
   useViewVideoMutation,
   useGetVideoStatsQuery,
   useTogglePublishStatusMutation,
   useUpdateVideoMutation,
   useDeleteVideoMutation,
} = videoApi;
