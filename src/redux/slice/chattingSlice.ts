import { createSlice } from "@reduxjs/toolkit";

const chattingSlice = createSlice({
  name: "chatting",
  initialState: {
    selectedProfile: {},
    chattingList: [],
  },
  reducers: {
    selectProfile(state, action) {
      state.selectedProfile = action.payload;
    },
    getChattingList(state, action) {
      state.chattingList = action.payload;
    },
  },
});

export const { selectProfile, getChattingList } = chattingSlice.actions;
export const selectSelectedProfile = (state) => state.chatting.selectedProfile;
export const selectChattingList = (state) => state.chatting.chattingList;
export default chattingSlice.reducer;
