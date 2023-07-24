export interface Tweet {
  tweetId: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  comments?: TweetComment[];
  likes?: User[];
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

export const dummyUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    email: "johndoe@example.com",
    iconLink: "https://example.com/icon/johndoe.png",
    followers: [
      {
        id: "2",
        username: "janedoe",
        email: "janedoe@example.com",
        iconLink: "https://example.com/icon/janedoe.png",
      },
      {
        id: "3",
        username: "bobsmith",
        email: "bobsmith@example.com",
        iconLink: "https://example.com/icon/bobsmith.png",
      },
    ],
  },
  {
    id: "2",
    username: "janedoe",
    email: "janedoe@example.com",
    iconLink: "https://example.com/icon/janedoe.png",
    followers: [
      {
        id: "1",
        username: "johndoe",
        email: "johndoe@example.com",
        iconLink: "https://example.com/icon/johndoe.png",
      },
    ],
  },
  {
    id: "3",
    username: "bobsmith",
    email: "bobsmith@example.com",
    iconLink: "https://example.com/icon/bobsmith.png",
    followers: [
      {
        id: "1",
        username: "johndoe",
        email: "johndoe@example.com",
        iconLink: "https://example.com/icon/johndoe.png",
      },
    ],
  },
];

export const dummyTweets: Tweet[] = [
  {
    tweetId: "1",
    content: "Hello world!",
    title: "My first tweet",
    createdAt: new Date("2022-01-01T00:00:00Z"),
    updatedAt: new Date("2022-01-01T00:00:00Z"),
    author: dummyUsers[0],
    comments: [
      {
        id: "3",
        content: "Great tweet!",
        createdAt: new Date(),
        updatedAt: new Date(),
        author: dummyUsers[1],
        likes: [],
        tweetId: "1",
      },
    ],
    likes: [dummyUsers[1], dummyUsers[2]],
  },
  {
    tweetId: "2",
    content: "Lorem ipsum dolor sit amet",
    title: "My second tweet",
    createdAt: new Date("2022-01-02T00:00:00Z"),
    updatedAt: new Date("2022-01-02T00:00:00Z"),
    author: dummyUsers[0],
    comments: [],
    likes: [],
  },
  {
    tweetId: "3",
    content: "Consectetur adipiscing elit",
    title: "My third tweet",
    createdAt: new Date("2022-01-03T00:00:00Z"),
    updatedAt: new Date("2022-01-03T00:00:00Z"),
    author: dummyUsers[1],
    comments: [
      {
        id: "3",
        content: "Good point!",
        createdAt: new Date("2022-01-03T00:01:00Z"),
        updatedAt: new Date("2022-01-03T00:01:00Z"),
        author: dummyUsers[0],
        likes: [dummyUsers[1]],
        tweetId: "3",
      },
    ],
    likes: [dummyUsers[0]],
  },
];
