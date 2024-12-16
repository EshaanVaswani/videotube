import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: false,
};

export const sidebarReducer = createSlice({
   name: "sidebar",
   initialState,
   reducers: {
      toggle: (state) => {
         state.isOpen = !state.isOpen;
      },
      close: (state) => {
         state.isOpen = false;
      },
   },
});

export const { toggle, close } = sidebarReducer.actions;
