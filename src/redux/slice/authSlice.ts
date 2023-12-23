import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthState {
  isLoggedIn: boolean;
  email: null | string;
  userName: null | string;
  userID: null | string;
  otherUserName: null | string;
  otherUserPhotoURL: null | string;
  otherUserLastActive: null | string;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
  otherUserName: null,
  otherUserPhotoURL: null,
  otherUserLastActive: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, uid } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = uid;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
    SET_OTHER_USER: (state, action) => {
      const { displayName, photoURL, lastActive } = action.payload;
      const koreanTime = new Date(lastActive).toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
      });
      state.otherUserName = displayName;
      state.otherUserPhotoURL = photoURL;
      state.otherUserLastActive = koreanTime;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_OTHER_USER } =
  authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserID = (state: RootState) => state.auth.userID;
export const selectOtherUserName = (state: RootState) =>
  state.auth.otherUserName;
export const selectOtherUserPhotoURL = (state: RootState) =>
  state.auth.otherUserPhotoURL;
export const selectOtherUserLastActive = (state: RootState) =>
  state.auth.otherUserLastActive;

export default authSlice.reducer;
