"use client";

import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import React, { useEffect } from "react";
import { auth } from "@/firebase";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import useFetchMessages from "@/hooks/useFetchMessages";

const MessageList = () => {
  const uid = auth?.currentUser?.uid || "이름없음";
  const { scrollContainerRef, scrollToBottom } = useScrollToBottom();
  const messages = useFetchMessages();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-col space-y-2 p-4 overflow-y-auto min-h-[85vh] max-h-[85vh]"
    >
      {messages.map((message) =>
        message.uid === uid ? (
          <MyMessage key={message.id} content={message.text} />
        ) : (
          <YourMessage
            key={message.id}
            content={message.text}
            photoURL={message?.photoURL}
          />
        )
      )}
    </div>
  );
};

export default MessageList;
