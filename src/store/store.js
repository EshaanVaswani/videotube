import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { authReducer } from "./reducers/authReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [authReducer.name]: authReducer.reducer,
      [sidebarReducer.name]: sidebarReducer.reducer,
   },
   middleware: (mid) => [...mid(), authApi.middleware],
});

export default store;
