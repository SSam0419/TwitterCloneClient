import axios, { AxiosResponse } from "axios";
import { Tweet } from "../model/models";

const domain = "https://localhost:44385/api/Tweet/";
export const getAllTweets = async (): Promise<AxiosResponse<Tweet[]>> => {
  const response = await axios
    .get(domain + "GetAllTweetByDate")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  console.log(response);
  return response;
};

export const createTweet = async (
  tweet: Tweet
): Promise<AxiosResponse<Tweet>> => {
  const response = await axios
    .post(domain + "addTweet", tweet)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  console.log(response);
  return response;
};
