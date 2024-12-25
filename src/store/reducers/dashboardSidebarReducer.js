import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isOpen: true,
};

export const dashboardSidebarReducer = createSlice({
   name: "dashboardSidebar",
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

export const { toggle, close } = dashboardSidebarReducer.actions;
