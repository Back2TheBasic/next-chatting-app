import Sidebar from "@/app/chat/Sidebar";
import ChatRoom from "./ChatRoom";

import styles from "./chat.module.scss";

const ChatPage = () => {
  return (
    <section className={styles.chatPage}>
      <Sidebar />
      <ChatRoom />
    </section>
  );
};

export default ChatPage;
