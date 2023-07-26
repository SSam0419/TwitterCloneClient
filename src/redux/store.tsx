import { AnyAction, Store, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import {  tweetSlicer } from "./slices/tweetSlicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { tweet: tweetSlicer.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

 
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};
export const useAppThunkDispatch = () => useDispatch<AppThunkDispatch>(); 