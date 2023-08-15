import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/models";
import * as action from "../actions/authAction";
import { AxiosError } from "axios";

export const enum LoginPageStatus {
  RegisterSuccessful,
  RegisterFailed,
  LoginSuccessful,
  LoginFailed,
}

type AuthState = {
  user: User | null;
  loginPageStatus: LoginPageStatus | null;
  error: String | null;
  loading: boolean | null;
};

export const authSlicer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
    loginPageStatus: null,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(action.registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.signUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.verifyAccesToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.registerUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
        state.loginPageStatus = LoginPageStatus.RegisterFailed;
      }
      const { status } = action.payload;
      if (status === 200) {
        state.loginPageStatus = LoginPageStatus.RegisterSuccessful;
      }
      state.loading = false;
    });
    builder.addCase(action.signUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.loginPageStatus = LoginPageStatus.LoginFailed;
        state.error = action.payload.response?.data;
      }
      const { status, data } = action.payload;
      if (status === 200) {
        console.log(data);
        state.loginPageStatus = LoginPageStatus.LoginSuccessful;
        state.user = data;
      }
      state.loading = false;
    });
    builder.addCase(action.verifyAccesToken.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.loginPageStatus = LoginPageStatus.LoginFailed;
        state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        if (status === 200) {
          console.log(data);
          state.loginPageStatus = LoginPageStatus.LoginSuccessful;
          state.user = data;
        }
      }
      state.loading = false;
    });
  },
});
