import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import { Tweet } from "../../model/models";

export const getAllTweets = createAsyncThunk<Tweet[]>(
  "tweet/getAllTweets",
  async (): Promise<Tweet[]> => {
    try {
      const response = await TweetApi.getAllTweets();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch tweets: " + error);
    }
  }
);

export const addTweet = createAsyncThunk<Tweet, Tweet, {}>(
  "tweet/addTweet",
  async (tweetData: Tweet, { rejectWithValue }) => {
    try {
      const response = await TweetApi.createTweet(tweetData);
      return (await response) as Tweet;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
