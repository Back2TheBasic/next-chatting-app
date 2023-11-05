"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./chat.module.scss";
import Profile from "./Profile";

import cx from "classnames";

interface Message {
  id: number;
  sender: string;
  text: string;
  isMe: boolean;
}

const MESSAGES = [
  { id: 0, sender: "wkqkel1", text: "hi", isMe: false },
  { id: 1, sender: "wkqkel", text: "hi", isMe: true },
  { id: 2, sender: "wkqkel1", text: "hi", isMe: false },
];

const OPPONENT_USER = {
  nickname: "john",
  profileSrc: "/profile_image_default.jpeg",
};

const ChatRoom = () => {
  const [messages, setMessages] = useState(MESSAGES);
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setMessages((prev) =>
      prev.concat({ id: prev.length + 1, sender: "wkqkel", text, isMe: true })
    );
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

interface MessageProps {
  message: Message;
}

const ChatMessage = ({ message }: MessageProps) => {
  return (
    <div
      className={cx(styles.chatMessage, {
        [styles.chatMessage_isMe]: message.isMe,
      })}
    >
      <Image
        className={styles.profile_image}
        width={24}
        height={24}
        src={OPPONENT_USER.profileSrc}
        alt="profile-image"
      />
      <div className={styles.bubble}>{message.text}</div>
    </div>
  );
};
export default ChatRoom;
