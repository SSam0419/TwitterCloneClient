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

export interface TweetComment {
  id: string;
  content: string;
  author: User;
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
  tweetId: string;
}
