import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../model/models";
import * as action from "../actions/tweetAction";

export interface TweetState {
  loading: boolean;
  allTweets: Tweet[];
  followingTweets: Tweet[] | null;
  tweetById: Tweet | null;
  modifiedTweet: Tweet | null;
  newTweet: Tweet | null;
  newRetweet: Tweet | null;
  error: string | null;
}

export const tweetSlicer = createSlice({
  name: "tweet",
  initialState: {
    loading: false,
    allTweets: [],
    followingTweets: null,
    tweetById: null,
    modifiedTweet: null,
    newTweet: null,
    newRetweet: null,
    error: null,
  } as TweetState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(action.getAllTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.getAllTweets.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.allTweets = data;
      } else {
        if (data instanceof Error) {
          state.error = data.message;
        } else {
          state.error = data.toString();
        }
      }
      state.loading = false;
    });
    builder.addCase(action.addTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.addTweet.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.allTweets = [data, ...state.allTweets];
      } else {
        if (data instanceof Error) {
          state.error = data.message;
        } else {
          state.error = data.toString();
        }
      }
      state.loading = false;
    });
  },
});
