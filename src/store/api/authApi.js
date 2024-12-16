import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST } from "@/constants";

export const authApi = createApi({
   reducerPath: "authApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${HOST}/api/v1/users/`,
      credentials: "include",
   }),
   tagTypes: ["Users"],
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (data) => ({
            url: "/register",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Users"],
      }),
      loginUser: builder.mutation({
         query: (data) => ({
            url: "/login",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Users"],
      }),
      logoutUser: builder.mutation({
         query: () => ({
            url: "/logout",
            method: "POST",
         }),
         invalidatesTags: ["Users"],
      }),
      currentUser: builder.query({
         query: () => ({
            url: "/current-user",
         }),
         providesTags: ["Users"],
      }),
   }),
});

export const {
   useRegisterUserMutation,
   useLoginUserMutation,
   useLogoutUserMutation,
   useCurrentUserQuery,
   useRefreshTokenMutation,
} = authApi;
