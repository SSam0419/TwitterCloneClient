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
  reducers: {
    addLikeTweetCount: (state, payload) => {
      const { tweetId, userId } = payload.payload;
      const tweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      if (tweet) {
        if (tweet.likes.indexOf(userId) === -1) {
          tweet.likes.length > 0
            ? (tweet.likes = [userId, ...tweet.likes])
            : (tweet.likes = [userId]);
        } else {
          tweet.likes.splice(tweet.likes.indexOf(userId), 1);
        }
      }
      // state.allTweets.map((tweet) => {
      //   if (tweet.tweetId === tweetId) {
      //     if (tweet.likes.indexOf(userId) === -1) {
      //       tweet.likes.length > 0
      //         ? (tweet.likes = [userId, ...tweet.likes])
      //         : (tweet.likes = [userId]);
      //     } else {
      //       tweet.likes.splice(tweet.likes.indexOf(userId), 1);
      //     }
      //   }
      // });
    },
    addLikeCommentCount: (state, payload) => {
      const { tweetId, userId } = payload.payload;

      const tweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      if (tweet) {
        tweet.comments.forEach((comment) => {
          const userIdIndex = comment.likes.indexOf(userId);
          if (userIdIndex === -1) {
            comment.likes.unshift(userId);
          } else {
            comment.likes.splice(userIdIndex, 1);
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

export const { addLikeTweetCount } = tweetSlicer.actions;
