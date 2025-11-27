import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const transcriptApi = createApi({
   reducerPath: "transcriptApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/transcript`,
      credentials: "include",
   }),
   endpoints: (builder) => ({
      generateTranscript: builder.mutation({
         query: (data) => ({
            url: "/generate",
            method: "POST",
            body: data,
         }),
      }),
      regenerateTranscript: builder.mutation({
         query: (videoId) => ({
            url: `/regenerate/${videoId}`,
            method: "POST",
         }),
         transformResponse: (response) => response.data,
      }),
   }),
});

export const {
   useGenerateTranscriptMutation,
   useRegenerateTranscriptMutation,
} = transcriptApi;
