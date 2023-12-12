import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlicer";
import userSlice from "./userSlicer";

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    users: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
