import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const commentApi = createApi({
   reducerPath: "commentApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/comments/`,
      credentials: "include",
   }),
   tagTypes: ["Comments"],
   endpoints: (builder) => ({
      getVideoComments: builder.query({
         query: ({ videoId, page = 1, limit = 10, sortBy = "latest" }) => ({
            url: `/${videoId}`,
            params: { page, limit, sortBy },
         }),
         providesTags: ["Comments"],
         transformResponse: (response) => response.data,
      }),
      addComment: builder.mutation({
         query: ({ videoId, content }) => ({
            url: `/${videoId}`,
            method: "POST",
            body: { content },
         }),
         invalidatesTags: ["Comments"],
      }),
      editComment: builder.mutation({
         query: ({ commentId, content }) => ({
            url: `/c/${commentId}`,
            method: "PATCH",
            body: { content },
         }),
         invalidatesTags: ["Comments"],
      }),
      deleteComment: builder.mutation({
         query: (commentId) => ({
            url: `/c/${commentId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Comments"],
      }),
   }),
});

export const {
   useGetVideoCommentsQuery,
   useAddCommentMutation,
   useEditCommentMutation,
   useDeleteCommentMutation,
} = commentApi;
