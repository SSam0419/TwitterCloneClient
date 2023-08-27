import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/models";
import * as action from "../actions/authAction";
import { AxiosError } from "axios";
import * as reducer from "../reducers/userReducer";

export const enum LoginPageStatus {
  RegisterSuccessful,
  RegisterFailed,
  LoginSuccessful,
  LoginFailed,
  LogoutFailed,
  Clean,
}

export type AuthState = {
  user: User | null;
  loginPageStatus: LoginPageStatus | null;
  error: string | null;
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
  reducers: {
    updateUserProfile: (
      state,
      payload: {
        payload: {
          bio: string;
          userId: string;
        };
        type: string;
      }
    ) => reducer.updateUserProfile(state, payload),
    followUser: (
      state,
      payload: {
        payload: {
          to: string;
        };
        type: string;
      }
    ) => reducer.followUser(state, payload),
  },
  extraReducers: (builder) => {
    builder.addCase(action.registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.signUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(action.logoutUser.pending, (state) => {
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
    builder.addCase(action.followUser.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
      }
      state.loading = false;
    });
    builder.addCase(action.logoutUser.fulfilled, (state, action) => {
      state.user = null;
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.response?.data;
        state.loginPageStatus = LoginPageStatus.LogoutFailed;
      }
      const { status } = action.payload;
      if (status === 200) {
        state.loginPageStatus = LoginPageStatus.Clean;
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
        // state.loginPageStatus = LoginPageStatus.LoginFailed;
        // state.error = action.payload.response?.data;
      } else {
        const { status, data } = action.payload;
        if (status === 200) {
          state.loginPageStatus = LoginPageStatus.LoginSuccessful;
          state.user = data;
        }
      }
      state.loading = false;
    });
  },
});

export const { updateUserProfile, followUser } = authSlicer.actions;
