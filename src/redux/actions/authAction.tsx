import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/AuthApi";
import * as userApi from "../../api/UserApi";

interface RegisterUserPayload {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }: RegisterUserPayload) => {
    const response = await authApi.registerUser({
      username: username,
      password: password,
    });
    console.log(response);
    return response;
  }
);
export const signUser = createAsyncThunk(
  "auth/signUser",
  async ({ username, password }: RegisterUserPayload) => {
    const response = await authApi.signUser({
      username: username,
      password: password,
    });

    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (userId: String) => {
    const response = await authApi.logout(userId);

    return response;
  }
);

export const verifyAccesToken = createAsyncThunk(
  "auth/verifyAccesToken",
  async () => {
    const response = await authApi.verifyAccesToken();

    return response;
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async ({ from, to }: { from: string; to: string }, thunkApi) => {
    const response = await userApi.followUser({ from, to });

    return response;
  }
);
