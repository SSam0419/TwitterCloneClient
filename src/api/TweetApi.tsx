import axios, { AxiosResponse } from "axios";
import { DOMAIN } from "../constant/Url";
const domain = DOMAIN + "api/Tweet/";
axios.defaults.withCredentials = true;

export const getAllTweets = async (): Promise<AxiosResponse> => {
  const response = await axios.get(domain + "GetAllTweetByDate");
  console.log(response);
  return response;
};

export const getTweetsByUserId = async (
  userId: string
): Promise<AxiosResponse> => {
  const response = await axios.get(domain + `GetAllTweetByUserId/${userId}`);
  console.log(response);
  return response;
};
export const getBookmarkedTweetsByUserId = async (
  userId: string
): Promise<AxiosResponse> => {
  const response = await axios.get(domain + `GetBookmarkedTweet/${userId}`);
  console.log(response);
  return response;
};

export const createTweet = async (
  tweetContent: string
): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "AddTweet", {
    tweetContent: tweetContent,
  });
  return response;
};

export const editTweet = async ({
  tweetId,
  tweetContent,
}: {
  tweetContent: string;
  tweetId: string;
}): Promise<AxiosResponse> => {
  const response = await axios.put(domain + "EditTweet/" + tweetId, {
    tweetContent: tweetContent,
  });
  return response;
};

export const likeTweet = async (tweetId: string): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "LikeTweet", {
    tweetId: tweetId,
  });
  return response;
};

export const bookmarkTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "BookmarkTweet", {
    tweetId: tweetId,
    userId,
  });
  return response;
};
