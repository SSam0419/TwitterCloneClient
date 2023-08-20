import axios from "axios";
import { DOMAIN } from "../constant/Url";

const domain = DOMAIN + "api/Comment/";

export type addCommentBody = {
  tweetId: string;
  content: string;
};
export const addComment = async (addCommentBody: addCommentBody) => {
  const response = await axios.post(domain + "AddComment", addCommentBody);
  return response;
};

export const likeComment = async (commentId: string) => {
  const response = await axios.post(domain + "LikeComment", { commentId });
  return response;
};
