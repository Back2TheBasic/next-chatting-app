"use client";

import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

type MessageProps = {
  uid: string;
  text: string;
  name: string;
  createdAt: any;
  id?: string;
  photoURL?: string;
};
const MessageList = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const uid = auth?.currentUser?.uid || "이름없음";
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageProps[] = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data() as MessageProps;
        fetchedMessages.push({ ...data, id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
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
