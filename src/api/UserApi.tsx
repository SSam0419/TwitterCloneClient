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
