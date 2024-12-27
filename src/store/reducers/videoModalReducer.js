import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
   isUpdateOpen: false,
   videoId: "",
};

export const videoModalReducer = createSlice({
   name: "videoModal",
   initialState,
   reducers: {
      open: (state, action) => {
         state.isOpen = true;
         state.isUpdateOpen = false;
         state.videoId = action.payload.videoId;
      },
      close: (state) => {
         state.isOpen = false;
         state.isUpdateOpen = false;
         state.videoId = "";
      },
      updateOpen: (state, action) => {
         state.isOpen = false;
         state.isUpdateOpen = true;
         state.videoId = action.payload.videoId;
      },
      updateClose: (state) => {
         state.isOpen = false;
         state.isUpdateOpen = false;
         state.videoId = "";
      },
   },
});

export const { open, close, updateOpen, updateClose } =
   videoModalReducer.actions;
