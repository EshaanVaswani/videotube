import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [authReducer.name]: authReducer.reducer,
   },
   middleware: (mid) => [...mid(), authApi.middleware],
});

export default store;
