import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const playlistApi = createApi({
   reducerPath: "playlistApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/playlist/`,
      credentials: "include",
   }),
   tagTypes: ["Playlist"],
   endpoints: (builder) => ({
      createPlaylist: builder.mutation({
         query: (data) => ({
            url: "/",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Playlist"],
      }),
      getPlaylists: builder.query({
         query: (userId) => ({
            url: `/user/${userId}`,
         }),
         providesTags: ["Playlist"],
         transformResponse: (response) => response.data,
      }),
      getPlaylistById: builder.query({
         query: (playlistId) => ({
            url: `/${playlistId}`,
         }),
         providesTags: ["Playlist"],
         transformResponse: (response) => response.data,
      }),
      addVideo: builder.mutation({
         query: ({ videoId, playlistId }) => ({
            url: `/add/${videoId}/${playlistId}`,
            method: "PATCH",
         }),
         invalidatesTags: ["Playlist"],
      }),
      removeVideo: builder.mutation({
         query: ({ videoId, playlistId }) => ({
            url: `/remove/${videoId}/${playlistId}`,
            method: "PATCH",
         }),
         invalidatesTags: ["Playlist"],
      }),
      toggleVisibility: builder.mutation({
         query: (playlistId) => ({
            url: `/toggle/${playlistId}`,
            method: "PATCH",
         }),
         invalidatesTags: ["Playlist"],
      }),
      updatePlaylist: builder.mutation({
         query: ({ playlistId, data }) => ({
            url: `/${playlistId}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["Playlist"],
      }),
      deletePlaylist: builder.mutation({
         query: (playlistId) => ({
            url: `/${playlistId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Playlist"],
      }),
      saveVideoToWatchLater: builder.mutation({
         query: (videoId) => ({
            url: `/save/watch-later/${videoId}`,
            method: "POST",
         }),
         invalidatesTags: ["Playlist"],
      }),
      removeVideoFromWatchLater: builder.mutation({
         query: (videoId) => ({
            url: `/remove/watch-later/${videoId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Playlist"],
      }),
      getWatchLaterVideos: builder.query({
         query: () => ({
            url: "/get/watch-later",
         }),
         transformResponse: (response) => response.data,
      }),
   }),
});

export const {
   useCreatePlaylistMutation,
   useGetPlaylistsQuery,
   useGetPlaylistByIdQuery,
   useAddVideoMutation,
   useRemoveVideoMutation,
   useToggleVisibilityMutation,
   useDeletePlaylistMutation,
   useUpdatePlaylistMutation,
   useGetWatchLaterVideosQuery,
   useSaveVideoToWatchLaterMutation,
   useRemoveVideoFromWatchLaterMutation,
} = playlistApi;
