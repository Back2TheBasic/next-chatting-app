import { AuthInfoStore } from "@/types";
import { atom } from "recoil";

export const authStore = atom<AuthInfoStore>({
  key: "auth",
  default: { email: "", nickname: "", profile_image: "" },
});
