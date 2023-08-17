export interface Tweet {
  tweetId: String;
  content: String;
  title: String;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comments: TweetComment[];
  likes: TweetLikes[];
}

export type TweetLikes = {
  tweetId: String;
  userId: String;
};
export interface User {
  id: String;
  username: String;
  email: String;
  iconLink: String;
  followers?: User[];
}

export interface UserConfidentials {
  username: String;
  password: String;
}

export interface ITweetComment {
  id: String;
  content: String;
  createdAt: Date;
  updatedAt: Date;
  tweetId: String;
}

export interface TweetComment extends ITweetComment {
  likes: CommentLikes[];
  author: User;
}

export type CommentLikes = {
  CommentId: String;
  UserId: String;
};
