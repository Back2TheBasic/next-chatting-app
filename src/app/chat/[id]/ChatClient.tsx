"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./chat.module.scss";

import cx from "classnames";
import { database } from "@/firebase/firebase";
import { child, ref, set, get, onValue } from "firebase/database";
import { useRecoilValue } from "recoil";
import { authStore } from "@/states/auth";
import { useParams } from "next/navigation";
import Profile from "@/component/profile/Profile";
import ChatMessage from "@/component/chatMessage/ChatMessage";
import { Message } from "@/types";

// TODO: 상대편 이미지 추가
const OPPONENT_USER = {
  nickname: "john",
  profileSrc: "/profile_image_default.jpeg",
};

const ChatClient = () => {
  const { id: chatroomId } = useParams();
  const authInfo = useRecoilValue(authStore);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const dbRef = ref(database);

    onValue(child(dbRef, `chats/${chatroomId}`), (snapshot) => {
      const data = snapshot.val() || [];
      setMessages(data);
    });
  }, [chatroomId]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) return;
    set(ref(database, `chats/${chatroomId}/` + messages.length), {
      sender: authInfo,
      text,
    });

    setText("");
  };

  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.chatroom}>
      <header className={styles.chatroom_header}>
        <Profile
          nickname={OPPONENT_USER.nickname}
          profileSrc={OPPONENT_USER.profileSrc}
        />
      </header>
      <div className={styles.chatroom_messages}>
        {messages.map((message) => (
          <ChatMessage key={message.text} message={message} />
        ))}
      </div>
      <form onSubmit={onSubmit} className={styles.chatroom_form}>
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          value={text}
          onChange={onChangeTextInput}
          className={styles.chatroom_form_input}
        />
        <button type="submit" className={styles.chatroom_form_button}>
          보내기
        </button>
      </form>
    </div>
  );
};

export default ChatClient;
