import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../model/models";
import * as action from "../actions/tweetAction";
import { AxiosError } from "axios";

export interface TweetState {
  loading: boolean;
  allTweets: Tweet[];
  followingTweets: Tweet[] | null;
  tweetById: Tweet | null;
  modifiedTweet: Tweet | null;
  newTweet: Tweet | null;
  newRetweet: Tweet | null;
  error: String | null;
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
  reducers: {
    addLikeTweetCount: (state, payload) => {
      const { tweetId, userId } = payload.payload;
      const tweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      if (tweet) {
        if (
          !tweet.likes.some(
            (like) => like.tweetId === tweetId && like.userId === userId
          )
        ) {
          tweet.likes.length > 0
            ? (tweet.likes = [
                { tweetId: tweetId, userId: userId },
                ...tweet.likes,
              ])
            : (tweet.likes = [{ tweetId: tweetId, userId: userId }]);
        } else {
          tweet.likes.splice(
            tweet.likes.indexOf({ tweetId: tweetId, userId: userId }),
            1
          );
        }
      }
    },
    addLikeCommentCount: (
      state,
      payload: {
        payload: {
          commentId: String;
          userId: String;
          tweetId: String;
        };
        type: String;
      }
    ) => {
      const { tweetId, userId, commentId } = payload.payload;

      const tweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      if (tweet) {
        tweet.comments.forEach((comment) => {
          const userIdIndex = comment.likes.some(
            (like) => like.UserId === userId
          );
          console.log(comment);
          if (userIdIndex) {
            comment.likes.length > 0
              ? (comment.likes = [
                  { CommentId: commentId, UserId: userId },
                  ...comment.likes,
                ])
              : (comment.likes = [{ CommentId: commentId, UserId: userId }]);
          } else {
            comment.likes.splice(
              comment.likes.indexOf({ CommentId: commentId, UserId: userId }),
              1
            );
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getAllTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.addTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.getAllTweets.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        console.log(data);
        if (status === 200) {
          state.allTweets = data;
        }
      }
      state.loading = false;
    });
    builder.addCase(action.addTweet.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        const newTweet: Tweet = data.newTweet;
        newTweet.author = data.author;
        if (status === 200) {
          state.allTweets = [newTweet, ...state.allTweets];
        }
      }
      state.loading = false;
    });
    builder.addCase(action.addComment.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        console.log(data);
        if (status == 200) {
          const tweetId = data.tweetId;
          const comment = data.comment;
          state.allTweets.map((tweet) => {
            if (tweet.tweetId == tweetId) {
              tweet.comments !== null
                ? (tweet.comments = [comment, ...tweet.comments])
                : (tweet.comments = [...comment]);
            }
          });
        }
      }

      state.loading = false;
    });
    builder.addCase(action.likeTweet.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      }

      state.loading = false;
    });
    builder.addCase(action.likeComment.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      }

      state.loading = false;
    });
  },
});

export const { addLikeTweetCount, addLikeCommentCount } = tweetSlicer.actions;
