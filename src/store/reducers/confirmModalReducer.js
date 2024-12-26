import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
   title: "",
   message: "",
};

export const confirmModalReducer = createSlice({
   name: "confirmModal",
   initialState,
   reducers: {
      open: (state, action) => {
         state.isOpen = true;
         state.title = action.payload.title;
         state.message = action.payload.message;
      },
      close: (state) => {
         state.isOpen = false;
         state.title = "";
         state.message = "";
      },
   },
});

export const { open, close } = confirmModalReducer.actions;
