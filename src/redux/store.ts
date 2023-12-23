import { configureStore } from '@reduxjs/toolkit';
import chattingSlice from './slice/chattingSlice';

export const store = configureStore({
  reducer: {
    chatting: chattingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
