import axios from "axios";
import { Tweet } from "../model/models";

const domain = "https://localhost:44385/api/Tweet/";
// https://localhost:44385/api/Tweet/GetAllTweetByDate
export const getAllTweets = async (): Promise<Tweet[]> => {
  const response = await axios
    .get(domain + "GetAllTweetByDate")
     
  return response.data;
};

export const createTweet = async (tweet: Tweet): Promise<Tweet> => {
  const response = await axios.post(domain + "addTweet", tweet);
  console.log(response);
  return response.data;
};
