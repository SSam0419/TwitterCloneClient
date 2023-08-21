export interface Tweet {
  tweetId: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comments: TweetComment[];
  likes: TweetLikes[];
  tweetBookmarks: TweetBookmarks[];
}

export type TweetLikes = {
  tweetId: string;
  userId: string;
};
export type TweetBookmarks = {
  tweetId: string;
  userId: string;
};

export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  iconLink: string;
  followers?: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserConfidentials {
  username: string;
  password: string;
}

export interface ITweetComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tweetId: string;
}

export interface TweetComment extends ITweetComment {
  likes: CommentLikes[];
  author: User;
}

export type CommentLikes = {
  commentId: string;
  userId: string;
};
