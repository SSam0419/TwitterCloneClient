import axios, { AxiosResponse } from "axios";
import { DOMAIN } from "../constant/Url";

const domain = DOMAIN + "api/File/";
axios.defaults.withCredentials = true;

export const uploadImage = async (image: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("file", image);
  const response = await axios.post(domain + "uploadImage", formData);
  return response;
};
