import axios, { AxiosResponse } from "axios";
import { DOMAIN } from "../constant/Url";

const domain = DOMAIN + "api/User/";
axios.defaults.withCredentials = true;
export const visitUserProfile = async (
  userId: string
): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "VisitProfile", { userId });
  return response;
};

export const followUser = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "follow", { from, to });
  return response;
};

export const updateUserProfile = async ({
  userId,
  bio,
}: {
  userId: string;
  bio: string;
}): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "UpdateProfile", { userId, bio });
  return response;
};
