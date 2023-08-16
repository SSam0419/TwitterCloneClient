import axios, { AxiosResponse } from "axios";
import { Tweet } from "../model/models";

const domain = "https://localhost:44385/api/Tweet/";
axios.defaults.withCredentials = true;

export const getAllTweets = async (): Promise<AxiosResponse<Tweet[]>> => {
  const response = await axios.get(domain + "GetAllTweetByDate");
  return response;
};

export const createTweet = async (
  tweetContent: String
): Promise<AxiosResponse<Tweet>> => {
  const response = await axios.post(domain + "AddTweet", {
    tweetContent: tweetContent,
  });
  return response;
};

export const likeTweet = async (tweetId: String): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "LikeTweet", {
    tweetId: tweetId,
  });
  return response;
};
export const unlikeTweet = async (tweetId: String): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "UnlikeTweet", {
    tweetId: tweetId,
  });
  return response;
};
