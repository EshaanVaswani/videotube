import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";

import { authReducer } from "./reducers/authReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { videoModalReducer } from "./reducers/videoModalReducer";
import { videoApi } from "./api/videoApi";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
      [authReducer.name]: authReducer.reducer,
      [sidebarReducer.name]: sidebarReducer.reducer,
      [videoModalReducer.name]: videoModalReducer.reducer,
   },
   middleware: (mid) => [...mid(), authApi.middleware, videoApi.middleware],
});

export default store;
