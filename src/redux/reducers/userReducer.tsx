import { Draft } from "immer";
import { AuthState } from "../slices/authSlicer";

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
  const { bio } = payload.payload;
  if (state.user) state.user.bio = bio;
};

export const followUser = (
  state: WritableDraft<AuthState>,
  payload: {
    payload: {
      to: string;
    };
    type: string;
  }
) => {
  const { to } = payload.payload;
  if (state.user) {
    state.user.followings = [
      { fromUserId: state.user.id, toUserId: to },
      ...state.user.followings,
    ];
  }
};
