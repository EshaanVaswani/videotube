import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
};

export const videoModalReducer = createSlice({
   name: "videoModal",
   initialState,
   reducers: {
      open: (state) => {
         state.isOpen = true;
      },
      close: (state) => {
         state.isOpen = false;
      },
   },
});

export const { open, close } = videoModalReducer.actions;
