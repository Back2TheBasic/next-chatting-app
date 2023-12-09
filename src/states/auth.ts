import { atom, selector } from "recoil";

export interface AuthInfo {
  email: string;
  nickname: string;
}

export const authInfoState = atom<AuthInfo>({
  key: "auth",
  default: { email: "", nickname: "" },
});

const isLogin = selector({
  key: "isLogin",
  get: ({ get }) => {
    return !!get(authInfoState).email;
  },
});
