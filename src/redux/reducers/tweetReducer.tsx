import { Draft } from "immer";
import { TweetState } from "../slices/tweetSlicer";
import { Tweet } from "../../model/models";

export type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

export enum TweetType {
  ProfileBookmarkedTweet,
  ProfileWroteTweet,
  ProfileRetweetedTweet,
  HomeTweet,
}

export const deleteTweet = (
  state: WritableDraft<TweetState>,
  payload: {
    payload: {
      tweetId: string;
      tweetType: TweetType;
    };
    type: string;
  }
) => {
  const { tweetId, tweetType } = payload.payload;
  let tweetIndex = -1;

  switch (tweetType) {
    case TweetType.HomeTweet:
      tweetIndex = state.allTweets.findIndex(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    case TweetType.ProfileBookmarkedTweet:
      tweetIndex = state.bookmarkedTweets.findIndex(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    case TweetType.ProfileWroteTweet:
      tweetIndex = state.wroteTweets.findIndex(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    case TweetType.ProfileRetweetedTweet:
      tweetIndex = state.retweetedTweets.findIndex(
        (tweet) => tweet.tweetId === tweetId
      );
      break;
    default:
      break;
  }

  if (tweetIndex !== -1) {
    switch (tweetType) {
      case TweetType.HomeTweet:
        state.allTweets.splice(tweetIndex, 1);
        break;
      case TweetType.ProfileBookmarkedTweet:
        state.bookmarkedTweets.splice(tweetIndex, 1);
        break;
      case TweetType.ProfileWroteTweet:
        state.wroteTweets.splice(tweetIndex, 1);
        break;
      case TweetType.ProfileRetweetedTweet:
        state.retweetedTweets.splice(tweetIndex, 1);
        break;
      default:
        break;
    }
  }
};

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
    case TweetType.ProfileRetweetedTweet:
      tweet = state.retweetedTweets.find((tweet) => tweet.tweetId === tweetId);
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
      tweet.likes?.length > 0
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
    case TweetType.ProfileRetweetedTweet:
      tweetIndex = state.retweetedTweets.findIndex(
        (tweet) => tweet.tweetId === updatedTweet.tweetId
      );
      state.wroteTweets[tweetIndex] = updatedTweet;
      break;
  }
};

export const addReTweet = (
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
    case TweetType.ProfileRetweetedTweet:
      foundTweet = state.retweetedTweets.find(
        (tweet) => tweet.tweetId === tweetId
      );
      break;

    default:
      break;
  }
  if (foundTweet) {
    const foundBookmarkIndex = foundTweet.reTweet.findIndex(
      (tb) => tb.reTweetedBy === userId
    );

    if (foundBookmarkIndex !== -1) {
      foundTweet.reTweet.splice(foundBookmarkIndex, 1);
      const checkTweetId = foundTweet.tweetId;
      const retweetedIndex = state.retweetedTweets.findIndex(
        (tweet) => tweet.tweetId === checkTweetId
      );
      state.retweetedTweets.splice(retweetedIndex, 1);
    } else {
      foundTweet.reTweet = [
        {
          tweetId: tweetId,
          reTweetedBy: userId,
        },
        ...foundTweet.reTweet,
      ];
      state.retweetedTweets = [foundTweet, ...state.retweetedTweets];
    }
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
    case TweetType.ProfileRetweetedTweet:
      foundTweet = state.retweetedTweets.find(
        (tweet) => tweet.tweetId === tweetId
      );
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
    case TweetType.ProfileRetweetedTweet:
      foundTweet = state.retweetedTweets.find(
        (tweet) => tweet.tweetId === tweetId
      );
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
