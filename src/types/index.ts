export interface AuthInfo {
  email: string;
  nickname: string;
  profile_image: string;
}

export interface Message {
  id: number;
  sender: AuthInfo;
  text: string;
}

export interface ChatRoomStore {
  opponent: AuthInfo;
}

export type AuthInfoStore = AuthInfo;
