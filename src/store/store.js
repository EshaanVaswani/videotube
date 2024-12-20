import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { videoApi } from "./api/videoApi";
import { likeApi } from "./api/likeApi";
import { subscriptionApi } from "./api/subscriptionApi";

import { authReducer } from "./reducers/authReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { videoModalReducer } from "./reducers/videoModalReducer";
import { videoPlayerReducer } from "./reducers/videoReducer";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
      [likeApi.reducerPath]: likeApi.reducer,
      [subscriptionApi.reducerPath]: subscriptionApi.reducer,
      [authReducer.name]: authReducer.reducer,
      [sidebarReducer.name]: sidebarReducer.reducer,
      [videoModalReducer.name]: videoModalReducer.reducer,
      [videoPlayerReducer.name]: videoPlayerReducer.reducer,
   },
   middleware: (mid) => [
      ...mid(),
      authApi.middleware,
      videoApi.middleware,
      likeApi.middleware,
      subscriptionApi.middleware,
   ],
});

export default store;
