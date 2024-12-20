import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const subscriptionApi = createApi({
   reducerPath: "subscriptionApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/subscriptions/`,
      credentials: "include",
   }),
   tagTypes: ["Subscriptions", "VideoStats"],
   endpoints: (builder) => ({
      toggleSubscription: builder.mutation({
         query: (channelId) => ({
            url: `/c/${channelId}`,
            method: "POST",
         }),
         invalidatesTags: (result, error, videoId) => [
            { type: "VideoStats", id: videoId },
            "Subscriptions",
         ],
      }),
   }),
});

export const { useToggleSubscriptionMutation } = subscriptionApi;
