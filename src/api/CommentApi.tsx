import axios from "axios";

const domain = "https://localhost:44385/api/Comment/";

export type addCommentBody = {
  tweetId: String;
  content: String;
};
export const addComment = async (addCommentBody: addCommentBody) => {
  const response = await axios.post(domain + "AddComment", addCommentBody);
  return response;
};

export const likeComment = async (tweetId: String) => {
  const response = await axios.post(domain + "LikeComment", { tweetId });
  return response;
};
