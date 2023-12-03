import React from "react";
import ChatHeader from "@/components/chat/chatHeader/ChatHeader";
import MessageList from "@/components/chat/messageList/MessageList";
import MessageInput from "@/components/chat/messageInput/MessageInput";

const ChatList = () => {
  return (
    <div className="min-h-[100vh] max-h-[100vh] overflow-hidden">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatList;
