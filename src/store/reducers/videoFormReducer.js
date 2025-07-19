import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   videoFile: null,
   thumbnail: null,
   title: "",
   description: "",
   transcript: "",
   tags: [],
   category: [],
};

export const videoFormReducer = createSlice({
   name: "videoForm",
   initialState,
   reducers: {
      setField: (state, action) => {
         const { key, value } = action.payload;
         state[key] = value;
      },
      setMultipleFields: (state, action) => {
         return { ...state, ...action.payload };
      },
      resetForm: () => initialState,
   },
});

export const { setField, setMultipleFields, resetForm } =
   videoFormReducer.actions;
