import axios, { AxiosResponse } from "axios";

const domain = "https://localhost:44385/api/User/";
axios.defaults.withCredentials = true;
export const visitUserProfile = async (
  userId: String
): Promise<AxiosResponse> => {
  const response = await axios.post(domain + "VisitProfile", { userId });
  return response;
};
