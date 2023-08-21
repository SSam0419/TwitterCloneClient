import { Draft } from "immer";
import { AuthState } from "../slices/authSlicer";
import { User } from "../../model/models";

export type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

export const updateUserProfile = (
  state: WritableDraft<AuthState>,
  payload: {
    payload: {
      userId: string;
      bio: string;
    };
    type: string;
  }
) => {
  const { userId, bio } = payload.payload;
  if (state.user) state.user.bio = bio;
};
