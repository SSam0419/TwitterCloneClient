import axios, { AxiosResponse } from "axios";
import { DOMAIN } from "../constant/Url";
const domain = DOMAIN + "api/Tweet/";
axios.defaults.withCredentials = true;

export const getAllTweets = async (): Promise<AxiosResponse> => {
  const response = await axios.get(domain + "GetAllTweetByDate");
  console.log(response);
  return response;
};

export const createTweet = async (
  tweetContent: String
): Promise<AxiosResponse> => {
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
