import axios from "axios";
import { Tweet } from "../model/models";

const domain = "https://localhost:44385/api/Tweet/";
// https://localhost:44385/api/Tweet/GetAllTweetByDate
export const getAllTweets = async (): Promise<Tweet[]> => {
  const data = await axios
    .get(domain + "GetAllTweetByDate")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return data;
};

export const createTweet = async (tweet: Tweet): Promise<Tweet> => {
  const response = await axios.post(domain + "addTweet", tweet);
  console.log(response);
  return response.data;
};
