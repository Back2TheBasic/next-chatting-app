"use client";

import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import React, { useEffect } from "react";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import useFetchMessages from "@/hooks/useFetchMessages";

import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useParams } from "next/navigation";
type MessageProps = {
  uid: string;
  text: string;
  name: string;
  createdAt: any;
  id?: string;
  photoURL?: string;
};
const MessageList = () => {
  const uid = auth?.currentUser?.uid || "이름없음";
  const params = useParams();
  const { scrollContainerRef, scrollToBottom } = useScrollToBottom();
  const messages = useFetchMessages(params.id as string);

  useEffect(() => {
    scrollToBottom();
  }, []);

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
