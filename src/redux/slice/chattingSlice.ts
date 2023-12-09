import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '@/types/user';

const chattingSlice = createSlice({
  name: 'chatting',
  initialState: {
    selectedProfile: {} as IUser,
  },
  reducers: {
    selectProfile(state, action) {
      state.selectedProfile = action.payload;
    },
  },
});

export const { selectProfile } = chattingSlice.actions;
export const selectSelectedProfile = (state: RootState) =>
  state.chatting.selectedProfile;
export default chattingSlice.reducer;
