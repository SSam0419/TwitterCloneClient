export interface Tweet {
  tweetId: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comments: TweetComment[];
  likes: String[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  iconLink: string;
  followers?: User[];
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
  likes: String[];
  author: User;
}

export type FetchedTweetComment = {
  comment: ITweetComment;
  commentAuthor: User;
  commentLikes: String[];
};
