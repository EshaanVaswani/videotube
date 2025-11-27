import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   uploadedFiles: {
      videoUrl: null,
      thumbnailUrl: null,
      duration: null,
   },
   transcript: {
      text: "",
      status: "idle", // 'idle' | 'loading' | 'success' | 'error'
      error: null,
   },
   formData: {
      title: "",
      description: "",
      tags: [],
      category: "",
   },
   currentStep: 0,
};

export const videoFormReducer = createSlice({
   name: "videoForm",
   initialState,
   reducers: {
      setCurrentStep: (state, action) => {
         state.currentStep = action.payload;
      },
      nextStep: (state) => {
         state.currentStep += 1;
      },
      prevStep: (state) => {
         state.currentStep -= 1;
      },
      setUploadedFiles: (state, action) => {
         state.uploadedFiles = action.payload;
      },
      setDetails: (state, action) => {
         state.formData.title = action.payload.title;
         state.formData.description = action.payload.description;
      },
      setTranscriptText: (state, action) => {
         state.transcript.text = action.payload;
      },
      setTranscriptStatus: (state, action) => {
         state.transcript.status = action.payload;
      },
      setTranscriptError: (state, action) => {
         state.transcript.error = action.payload;
      },
      setTagsCategory: (state, action) => {
         state.formData.tags = action.payload.tags;
         state.formData.category = action.payload.category;
      },
      resetVideoUpload: () => initialState,
   },
});

export const {
   setCurrentStep,
   nextStep,
   prevStep,
   setUploadedFiles,
   setDetails,
   setTranscriptText,
   setTranscriptStatus,
   setTranscriptError,
   setTagsCategory,
   resetVideoUpload,
} = videoFormReducer.actions;

export default videoFormReducer.reducer;
