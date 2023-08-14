import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import { Tweet } from "../../model/models";

export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
  const response = await TweetApi.getAllTweets();
  return response;
});

export const addTweet = createAsyncThunk(
  "tweet/addTweet",
  async (tweetData: Tweet) => {
    const response = await TweetApi.createTweet(tweetData);
    return response;
  }
);
