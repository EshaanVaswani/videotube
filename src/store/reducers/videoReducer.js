import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isPlaying: false,
   volume: 1,
   isMuted: false,
   playbackRate: 1,
   quality: "auto",
   currentTime: 0,
   isTheaterMode: false,
   isFullscreen: false,
};

export const videoPlayerReducer = createSlice({
   name: "videoPlayer",
   initialState,
   reducers: {
      setPlaying: (state, action) => {
         state.isPlaying = action.payload;
      },
      setVolume: (state, action) => {
         state.volume = action.payload;
         if (action.payload > 0) {
            state.isMuted = false;
         }
      },
      setMuted: (state, action) => {
         state.isMuted = action.payload;
      },
      setPlaybackRate: (state, action) => {
         state.playbackRate = action.payload;
      },
      setQuality: (state, action) => {
         state.quality = action.payload;
      },
      setCurrentTime: (state, action) => {
         state.currentTime = action.payload;
      },
      toggleTheaterMode: (state) => {
         state.isTheaterMode = !state.isTheaterMode;
      },
      toggleFullscreen: (state) => {
         state.isFullscreen = !state.isFullscreen;
      },
   },
});

export const {
   setPlaying,
   setVolume,
   setMuted,
   setPlaybackRate,
   setQuality,
   setCurrentTime,
   toggleTheaterMode,
   toggleFullscreen,
} = videoPlayerReducer.actions;
