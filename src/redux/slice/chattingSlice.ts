import { createSlice } from "@reduxjs/toolkit";

const chattingSlice = createSlice({
  name: "chatting",
  initialState: {
    selectedProfile: {},
  },
  reducers: {
    selectProfile(state, action) {
      state.selectedProfile = action.payload;
    },
  },
});

export const { selectProfile } = chattingSlice.actions;
export const selectSelectedProfile = (state) => state.chatting.selectedProfile;
export default chattingSlice.reducer;
