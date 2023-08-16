import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import * as CommentApi from "../../api/CommentApi";

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

export const addComment = createAsyncThunk(
  "tweet/addComment",
  async (addCommentBody: CommentApi.addCommentBody) => {
    const response = await CommentApi.addComment(addCommentBody);
    return response;
  }
);
