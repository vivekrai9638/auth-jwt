import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import authReducer from "../slices/authSlice";
import tweetReducer from "../slices/tweetSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tweet: tweetReducer
  },
});

setupListeners(store.dispatch);
