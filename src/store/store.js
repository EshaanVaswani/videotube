import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { videoApi } from "./api/videoApi";
import { likeApi } from "./api/likeApi";
import { subscriptionApi } from "./api/subscriptionApi";
import { commentApi } from "./api/commentApi";
import { channelApi } from "./api/channelApi";
import { tweetApi } from "./api/tweetApi";
import { dashboardApi } from "./api/dashboardApi";
import { playlistApi } from "./api/playlistApi";

import { authReducer } from "./reducers/authReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { videoPlayerReducer } from "./reducers/videoReducer";
import { videoModalReducer } from "./reducers/videoModalReducer";
import { confirmModalReducer } from "./reducers/confirmModalReducer";
import { dashboardSidebarReducer } from "./reducers/dashboardSidebarReducer";
import { playlistModalReducer } from "./reducers/playlistModalReducer";
import { saveModalReducer } from "./reducers/saveModalReducer";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
      [likeApi.reducerPath]: likeApi.reducer,
      [commentApi.reducerPath]: commentApi.reducer,
      [channelApi.reducerPath]: channelApi.reducer,
      [subscriptionApi.reducerPath]: subscriptionApi.reducer,
      [tweetApi.reducerPath]: tweetApi.reducer,
      [dashboardApi.reducerPath]: dashboardApi.reducer,
      [playlistApi.reducerPath]: playlistApi.reducer,

      [authReducer.name]: authReducer.reducer,
      [sidebarReducer.name]: sidebarReducer.reducer,
      [videoModalReducer.name]: videoModalReducer.reducer,
      [videoPlayerReducer.name]: videoPlayerReducer.reducer,
      [confirmModalReducer.name]: confirmModalReducer.reducer,
      [dashboardSidebarReducer.name]: dashboardSidebarReducer.reducer,
      [playlistModalReducer.name]: playlistModalReducer.reducer,
      [saveModalReducer.name]: saveModalReducer.reducer,
   },
   middleware: (mid) => [
      ...mid(),
      authApi.middleware,
      videoApi.middleware,
      likeApi.middleware,
      subscriptionApi.middleware,
      commentApi.middleware,
      channelApi.middleware,
      tweetApi.middleware,
      dashboardApi.middleware,
      playlistApi.middleware,
   ],
});

export default store;
