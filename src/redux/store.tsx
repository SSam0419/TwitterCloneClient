import { configureStore } from "@reduxjs/toolkit";
import { tweetSlicer } from "./slices/tweetSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlicer } from "./slices/authSlicer";

export const store = configureStore({
  reducer: { tweet: tweetSlicer.reducer, auth: authSlicer.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
