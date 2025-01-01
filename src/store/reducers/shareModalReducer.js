import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
   link: "",
};

export const shareModalReducer = createSlice({
   name: "shareModal",
   initialState,
   reducers: {
      open: (state, action) => {
         state.isOpen = true;
         state.link = action.payload.link;
      },
      close: (state) => {
         state.isOpen = false;
         state.link = "";
      },
   },
});

export const { open, close } = shareModalReducer.actions;
