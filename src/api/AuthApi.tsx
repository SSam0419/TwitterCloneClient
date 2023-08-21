import axios, { AxiosResponse } from "axios";
import { User } from "../model/models";
import { DOMAIN } from "../constant/Url";

const domain = DOMAIN + "api/Auth/";
axios.defaults.withCredentials = true;
interface Credentials {
  username: string;
  password: string;
}
export const registerUser = async ({
  username,
  password,
}: Credentials): Promise<AxiosResponse<User>> => {
  const response = await axios
    .post(domain + "register", { username: username, password: password })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return response;
};
export const signUser = async ({
  username,
  password,
}: Credentials): Promise<AxiosResponse<User>> => {
  axios.defaults.withCredentials = true;
  const response = await axios
    .post(domain + "sign_in", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from all domains
      },
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
};
export const logout = async (userId: String): Promise<AxiosResponse> => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(domain + "log_out", {
    userId,
  });
  return response;
};

export const verifyAccesToken = async (): Promise<AxiosResponse> => {
  axios.defaults.withCredentials = true;
  const response = await axios
    .get(domain + "access_token", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
};
