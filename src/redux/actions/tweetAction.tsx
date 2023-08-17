import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import * as CommentApi from "../../api/CommentApi";
import { useAppDispatch } from "../store";
import { addLikeCommentCount, addLikeTweetCount } from "../slices/tweetSlicer";
import { AxiosError } from "axios";

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
export const likeComment = createAsyncThunk(
  "tweet/likeComment",
  async (
    {
      commentId,
      userId,
      tweetId,
    }: { tweetId: String; userId: String; commentId: String },
    thunkApi
  ) => {
    thunkApi.dispatch(addLikeCommentCount({ commentId, userId, tweetId }));
    const response = await CommentApi.likeComment(commentId);
    return response;
  }
);
export const likeTweet = createAsyncThunk(
  "tweet/likeTweet",
  async (
    { tweetId, userId }: { tweetId: String; userId: String },
    thunkApi
  ) => {
    thunkApi.dispatch(addLikeTweetCount({ tweetId, userId }));
    const response = await TweetApi.likeTweet(tweetId);
    return response;
  }
);
