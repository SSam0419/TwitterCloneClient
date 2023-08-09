import axios, { AxiosResponse } from "axios";
import { User } from "../model/models";

const domain = "https://localhost:44385/api/Auth/";
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
      console.log(error);
      return error;
    });
  console.log(response);
  return response;
};
export const signUser = async ({
  username,
  password,
}: Credentials): Promise<AxiosResponse<User>> => {
  const response = await axios
    .post(domain + "sign_in", { username: username, password: password })
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
