import Sidebar from "@/component/sideBar/Sidebar";
import styles from "./chat.module.scss";
import ChatClient from "./ChatClient";

const ChatPage = () => {
  return (
    <section className={styles.chatPage}>
      <Sidebar />
      <ChatClient />
    </section>
  );
};

export default ChatPage;
