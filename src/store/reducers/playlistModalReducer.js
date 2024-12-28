import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
   isUpdateOpen: false,
   playlistId: "",
};

export const playlistModalReducer = createSlice({
   name: "playlistModal",
   initialState,
   reducers: {
      open: (state, action) => {
         state.isOpen = true;
         state.isUpdateOpen = false;
         state.playlistId = action.payload.playlistId;
      },
      close: (state) => {
         state.isOpen = false;
         state.isUpdateOpen = false;
         state.playlistId = "";
      },
      updateOpen: (state, action) => {
         state.isOpen = false;
         state.isUpdateOpen = true;
         state.playlistId = action.payload.playlistId;
      },
      updateClose: (state) => {
         state.isOpen = false;
         state.isUpdateOpen = false;
         state.playlistId = "";
      },
   },
});

export const { open, close, updateOpen, updateClose } =
   playlistModalReducer.actions;
