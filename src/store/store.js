import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth.slice";
import userReducer from "./reducers/user.slice";
import clockReducer from "./reducers/clock.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    clock: clockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
