import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/AuthApi";

interface RegisterUserPayload {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }: RegisterUserPayload) => {
    try {
      const response = await authApi.registerUser({
        username: username,
        password: password,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const signUser = createAsyncThunk(
  "auth/signUser",
  async ({ username, password }: RegisterUserPayload) => {
    try {
      const response = await authApi.signUser({
        username: username,
        password: password,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
