import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
   videoId: "",
};

export const saveModalReducer = createSlice({
   name: "saveModal",
   initialState,
   reducers: {
      open: (state, action) => {
         state.isOpen = true;
         state.videoId = action.payload.videoId;
      },
      close: (state) => {
         state.isOpen = false;
         state.videoId = "";
      },
   },
});

export const { open, close } = saveModalReducer.actions;
