import { configureStore } from "@reduxjs/toolkit";
import chattingSlice from "./slice/chattingSlice";

export const store = configureStore({
  reducer: {
    chatting: chattingSlice,
  },
});

export default store;
