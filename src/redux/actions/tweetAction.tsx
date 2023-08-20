import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TweetApi from "../../api/TweetApi";
import * as CommentApi from "../../api/CommentApi";
import {
  addBookmarkCount,
  addLikeCommentCount,
  addLikeTweetCount,
  editTweet as _editTweet,
} from "../slices/tweetSlicer";
import { TweetType } from "../reducers/tweetReducer";
import { AxiosError } from "axios";

export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
  const response = await TweetApi.getAllTweets();
  return response;
});

export const getWroteTweets = createAsyncThunk(
  "tweet/getWroteTweets",
  async (userId: string) => {
    const response = await TweetApi.getTweetsByUserId(userId);
    return response;
  }
);
export const getBookmarkedTweets = createAsyncThunk(
  "tweet/getBookmarkedTweets",
  async (userId: string) => {
    const response = await TweetApi.getBookmarkedTweetsByUserId(userId);
    return response;
  }
);

export const addTweet = createAsyncThunk(
  "tweet/addTweet",
  async (tweetContent: string) => {
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
      tweetType,
    }: {
      tweetId: string;
      userId: string;
      commentId: string;
      tweetType: TweetType;
    },
    thunkApi
  ) => {
    thunkApi.dispatch(
      addLikeCommentCount({ commentId, userId, tweetId, tweetType })
    );
    const response = await CommentApi.likeComment(commentId);
    return response;
  }
);
export const likeTweet = createAsyncThunk(
  "tweet/likeTweet",
  async (
    {
      tweetId,
      userId,
      tweetType,
    }: { tweetId: string; userId: string; tweetType: TweetType },
    thunkApi
  ) => {
    thunkApi.dispatch(addLikeTweetCount({ tweetId, userId, tweetType }));
    const response = await TweetApi.likeTweet(tweetId);
    return response;
  }
);
export const editTweet = createAsyncThunk(
  "tweet/editTweet",
  async (
    {
      tweetId,
      tweetContent,
      tweetType,
    }: {
      tweetId: string;
      tweetContent: string;
      tweetType: TweetType;
    },
    thunkApi
  ) => {
    const response = await TweetApi.editTweet({
      tweetId: tweetId,
      tweetContent: tweetContent,
    });
    if (!(response instanceof AxiosError)) {
      thunkApi.dispatch(_editTweet({ tweetType, updatedTweet: response.data }));
    }
    return response;
  }
);

export const bookmarkTweet = createAsyncThunk(
  "tweet/bookmarkTweet",
  async (
    {
      tweetId,
      userId,
      tweetType,
    }: { tweetId: string; userId: string; tweetType: TweetType },
    thunkApi
  ) => {
    thunkApi.dispatch(addBookmarkCount({ tweetId, userId, tweetType }));
    const response = await TweetApi.bookmarkTweet({ tweetId, userId });
    return response;
  }
);
