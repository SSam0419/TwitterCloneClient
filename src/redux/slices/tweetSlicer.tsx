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
      state.allTweets = action.payload;
      state.loading = false;
      console.log(state.allTweets);
    });
  },
});
