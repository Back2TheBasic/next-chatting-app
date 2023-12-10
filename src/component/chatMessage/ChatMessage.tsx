import Profile from "@/component/profile/Profile";
import { authStore } from "@/states/auth";
import { Message } from "@/types";
import { useRecoilValue } from "recoil";

import cx from "classnames";

import styles from "./chatMessage.module.scss";

interface MessageProps {
  message: Message;
}

const ChatMessage = ({ message }: MessageProps) => {
  const authInfo = useRecoilValue(authStore);
  const isMe = message.sender.nickname === authInfo.nickname;

  const nickName = isMe ? "" : message.sender.email.split("@")[0];
  const profileSrc =
    message.sender.profile_image || "/profile_image_default.jpeg";

  return (
    <div
      className={cx(styles.chatMessage, {
        [styles.chatMessage_isMe]: isMe,
      })}
    >
      <Profile nickname={nickName} profileSrc={profileSrc} />
      <div className={styles.bubble}>{message.text}</div>
    </div>
  );
};
export default ChatMessage;
