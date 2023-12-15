"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, getChatId } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "@/redux/slice/loadingSlice";
import {
  selectEmail,
  selectUserID,
  selectUserName,
} from "@/redux/slice/authSlice";
import { useSelector } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatList from "@/components/chat/chatList/ChatList";

const ChatClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userUid = useSelector(selectUserID);

  const navToChatRoom = async (friend: string) => {
    if (!userEmail || !userUid) {
      throw new Error("User email or user UID is null");
    }

    const chatId = await getChatId(userEmail, friend, userUid);
    router.push(`/chat/${chatId}`);
  };
  return (
    <div className="flex bg-white">
      <div className="border-r border-s-gray-500">
        <div className="flex-shrink-0 w-64">
          <Sidebar onClick={navToChatRoom} />
        </div>
      </div>
      <div className="flex-grow">
        <ChatList />
      </div>
    </div>
  );
};

export default ChatClient;
