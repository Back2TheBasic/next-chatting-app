import { ChatRoomStore } from "@/types";
import { atom } from "recoil";

export const chatRoomStore = atom<ChatRoomStore>({
  key: "auth",
  default: {
    opponent: {
      nickname: "",
      email: "",
      profile_image: "",
    },
  },
});
