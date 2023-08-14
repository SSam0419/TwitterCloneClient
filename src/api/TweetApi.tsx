import axios, { AxiosResponse } from "axios";
import { Tweet } from "../model/models";

const domain = "https://localhost:44385/api/Tweet/";
axios.defaults.withCredentials = true;
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
  tweetContent: String
): Promise<AxiosResponse<Tweet>> => {
  axios.defaults.withCredentials = true;
  const response = await axios
    .post(domain + "AddTweet", {
      headers: {
        "Content-Type": "application/json",
      },
      tweetContent: tweetContent,
    })
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
