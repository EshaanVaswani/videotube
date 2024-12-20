import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const likeApi = createApi({
   reducerPath: "likeApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/likes/`,
      credentials: "include",
   }),
   tagTypes: ["Likes", "VideoStats"],
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
   }),
});

export const { useToggleVideoLikeMutation } = likeApi;
