import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";

export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
  const response = await TweetApi.getAllTweets();
  return response;
});

export const addTweet = createAsyncThunk(
  "tweet/addTweet",
  async (tweetContent: String) => {
    const response = await TweetApi.createTweet(tweetContent);
    return response;
  }
);
