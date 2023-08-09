import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/models";
import * as action from "../actions/authAction";

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
  loading: boolean;
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
    builder.addCase(action.registerUser.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.loginPageStatus = LoginPageStatus.RegisterSuccessful;
      } else {
        if (data instanceof Error) {
          state.error = data.message;
          state.loginPageStatus = LoginPageStatus.RegisterFailed;
        } else {
          state.error = data.toString();
        }
      }
      state.loading = false;
    });
    builder.addCase(action.signUser.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.loginPageStatus = LoginPageStatus.LoginSuccessful;
      } else {
        if (data instanceof Error) {
          state.error = data.message;
          state.loginPageStatus = LoginPageStatus.LoginFailed;
        } else {
          state.error = data.toString();
        }
      }
      state.loading = false;
    });
  },
});
