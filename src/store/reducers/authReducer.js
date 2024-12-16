import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   user: null,
   error: null,
};

export const authReducer = createSlice({
   name: "auth",
   initialState,
   reducers: {
      userExist: (state, action) => {
         state.isLoggedIn = true;
         state.user = action.payload;
         state.error = null;
      },
      userNotExist: (state) => {
         state.isLoggedIn = false;
         state.user = null;
         state.error = null;
      },
   },
});

export const { userExist, userNotExist } = authReducer.actions;
