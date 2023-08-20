import { Draft } from "immer";
import { TweetState } from "../slices/tweetSlicer";
import { Tweet } from "../../model/models";

export type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

export enum TweetType {
  ProfileBookmarkedTweet,
  ProfileWroteTweet,
  HomeTweet,
}

export const addLikeTweetCount = (
  state: WritableDraft<TweetState>,
  payload: {
    payload: {
      tweetId: string;
      userId: string;
      tweetType: TweetType;
    };
    type: string;
  }
) => {
  const { tweetId, userId, tweetType } = payload.payload;
  let tweet;
  switch (tweetType) {
    case TweetType.HomeTweet:
      tweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      break;
    case TweetType.ProfileBookmarkedTweet:
      tweet = state.bookmarkedTweets.find((tweet) => tweet.tweetId === tweetId);
      break;
    case TweetType.ProfileWroteTweet:
      tweet = state.wroteTweets.find((tweet) => tweet.tweetId === tweetId);
      break;

    default:
      break;
  }

  if (tweet) {
    if (
      !tweet.likes.some(
        (like) => like.tweetId === tweetId && like.userId === userId
      )
    ) {
      tweet.likes.length > 0
        ? (tweet.likes = [{ tweetId: tweetId, userId: userId }, ...tweet.likes])
        : (tweet.likes = [{ tweetId: tweetId, userId: userId }]);
    } else {
      tweet.likes.splice(
        tweet.likes.indexOf({ tweetId: tweetId, userId: userId }),
        1
      );
    }
  }
};

export const editTweet = (
  state: WritableDraft<TweetState>,
  payload: {
    payload: {
      updatedTweet: Tweet;
      tweetType: TweetType;
    };
    type: string;
  }
) => {
  const { updatedTweet, tweetType } = payload.payload;

  let tweetIndex;
  switch (tweetType) {
    case TweetType.HomeTweet:
      tweetIndex = state.allTweets.findIndex(
        (tweet) => tweet.tweetId === updatedTweet.tweetId
      );
      state.allTweets[tweetIndex] = updatedTweet;
      break;
    case TweetType.ProfileBookmarkedTweet:
      tweetIndex = state.bookmarkedTweets.findIndex(
        (tweet) => tweet.tweetId === updatedTweet.tweetId
      );
      state.bookmarkedTweets[tweetIndex] = updatedTweet;
      break;
    case TweetType.ProfileWroteTweet:
      tweetIndex = state.wroteTweets.findIndex(
        (tweet) => tweet.tweetId === updatedTweet.tweetId
      );
      state.wroteTweets[tweetIndex] = updatedTweet;
      break;
  }
};

export const addLikeCommentCount = (
  state: WritableDraft<TweetState>,
  payload: {
    payload: {
      tweetType: TweetType;
      commentId: string;
      userId: string;
      tweetId: string;
    };
    type: string;
  }
) => {
  const { tweetId, userId, commentId, tweetType } = payload.payload;

  let foundTweet;
  switch (tweetType) {
    case TweetType.HomeTweet:
      foundTweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      break;
    case TweetType.ProfileBookmarkedTweet:
      foundTweet = state.bookmarkedTweets.find(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    case TweetType.ProfileWroteTweet:
      foundTweet = state.wroteTweets.find((tweet) => tweet.tweetId === tweetId);
      break;

    default:
      break;
  }

  if (foundTweet) {
    const foundComment = foundTweet.comments.find(
      (comment) => comment.id === commentId
    );
    if (foundComment) {
      const likeIndex = foundComment.likes.findIndex(
        (like) => like.userId === userId
      );

      if (likeIndex !== -1) {
        foundComment.likes.splice(likeIndex, 1);
      } else {
        foundComment.likes = [
          {
            commentId: commentId,
            userId: userId,
          },
          ...foundComment.likes,
        ];
      }
    }
  }
};

export const addBookmarkCount = (
  state: WritableDraft<TweetState>,
  payload: {
    payload: {
      tweetId: string;
      userId: string;
      tweetType: TweetType;
    };
    type: string;
  }
) => {
  const { tweetId, userId, tweetType } = payload.payload;

  let foundTweet;
  switch (tweetType) {
    case TweetType.HomeTweet:
      foundTweet = state.allTweets.find((tweet) => tweet.tweetId === tweetId);
      break;
    case TweetType.ProfileBookmarkedTweet:
      foundTweet = state.bookmarkedTweets.find(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    case TweetType.ProfileWroteTweet:
      foundTweet = state.wroteTweets.find((tweet) => tweet.tweetId === tweetId);
      break;

    default:
      break;
  }
  if (foundTweet) {
    const foundBookmarkIndex = foundTweet.tweetBookmarks.findIndex(
      (tb) => tb.userId === userId
    );

    if (foundBookmarkIndex !== -1) {
      foundTweet.tweetBookmarks.splice(foundBookmarkIndex, 1);
    } else {
      foundTweet.tweetBookmarks = [
        {
          tweetId: tweetId,
          userId: userId,
        },
        ...foundTweet.tweetBookmarks,
      ];
    }
  }
};
