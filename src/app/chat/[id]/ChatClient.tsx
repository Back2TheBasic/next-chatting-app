"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, createOrUpdateDB, getChatId, getUserInfo } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "@/redux/slice/loadingSlice";
import {
  SET_OTHER_USER,
  selectEmail,
  selectUserID,
  selectUserName,
} from "@/redux/slice/authSlice";
import { useSelector } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatList from "@/components/chat/chatList/ChatList";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userUid = useSelector(selectUserID);
  const [user] = useAuthState(auth);
  const navToChatRoom = async (friend: string) => {
    createOrUpdateDB(user, friend);
    if (!userEmail || !userUid) {
      throw new Error("User email or user UID is null");
    }
    console.log("friend", friend);

    const chatId = await getChatId(userEmail, userUid, friend);
    router.push(`/chat/${chatId}`);
    otherUser(friend);
  };

  const otherUser = async (friend: string) => {
    const userInfo = await getUserInfo(friend);
    dispatch(SET_OTHER_USER(userInfo));
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
