import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import { Tweet } from "../../model/models";

export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
  try {
    const response = await TweetApi.getAllTweets();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch tweets: " + error);
  }
});

export const addTweet = createAsyncThunk(
  "tweet/addTweet",
  async (tweetData: Tweet, { rejectWithValue }) => {
    try {
      const response = await TweetApi.createTweet(tweetData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
