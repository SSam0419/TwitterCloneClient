import axios from "axios";
import { DOMAIN } from "../constant/Url";

const domain = DOMAIN + "api/Comment/";

export type addCommentBody = {
  tweetId: String;
  content: String;
};
export const addComment = async (addCommentBody: addCommentBody) => {
  const response = await axios.post(domain + "AddComment", addCommentBody);
  return response;
};

export const likeComment = async (commentId: String) => {
  const response = await axios.post(domain + "LikeComment", { commentId });
  console.log("res: " + response);
  return response;
};
