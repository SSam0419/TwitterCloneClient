import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../model/models";
import * as action from "../actions/tweetAction";
import * as reducer from "../reducers/tweetReducer";
import { AxiosError } from "axios";
import { TweetType } from "../reducers/tweetReducer";

export interface TweetState {
  loading: boolean;
  allTweets: Tweet[];
  wroteTweets: Tweet[];
  bookmarkedTweets: Tweet[];
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
    wroteTweets: [],
    bookmarkedTweets: [],
    followingTweets: null,
    tweetById: null,
    modifiedTweet: null,
    newTweet: null,
    newRetweet: null,
    error: null,
  } as TweetState,
  reducers: {
    addLikeTweetCount: (
      state,
      payload: {
        payload: {
          tweetId: string;
          userId: string;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.addLikeTweetCount(state, payload),
    deleteTweet: (
      state,
      payload: {
        payload: {
          tweetId: string;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.deleteTweet(state, payload),
    editTweet: (
      state,
      payload: {
        payload: {
          updatedTweet: Tweet;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.editTweet(state, payload),
    addLikeCommentCount: (
      state,
      payload: {
        payload: {
          commentId: string;
          tweetId: string;
          userId: string;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.addLikeCommentCount(state, payload),
    addBookmarkCount: (
      state,
      payload: {
        payload: {
          tweetId: string;
          userId: string;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.addBookmarkCount(state, payload),
    addReTweet: (
      state,
      payload: {
        payload: {
          tweetId: string;
          userId: string;
          tweetType: TweetType;
        };
        type: string;
      }
    ) => reducer.addReTweet(state, payload),
  },

  extraReducers: (builder) => {
    builder.addCase(action.getAllTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.getBookmarkedTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.getWroteTweets.pending, (state) => {
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
    builder.addCase(action.getBookmarkedTweets.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        console.log(data);
        if (status === 200) {
          state.bookmarkedTweets = data;
        }
      }
      state.loading = false;
    });
    builder.addCase(action.getWroteTweets.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        console.log(data);
        if (status === 200) {
          state.wroteTweets = data;
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
    builder.addCase(action.editTweet.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
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
    builder.addCase(action.deleteTweet.fulfilled, (state, action) => {
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
    builder.addCase(action.addReTweet.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      }

      state.loading = false;
    });
  },
});

export const {
  addLikeTweetCount,
  addLikeCommentCount,
  addBookmarkCount,
  editTweet,
  deleteTweet,
  addReTweet,
} = tweetSlicer.actions;
