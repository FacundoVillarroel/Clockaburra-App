import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth.slice";
import userReducer from "./reducers/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
