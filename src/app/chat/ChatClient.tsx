"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "@/redux/slice/loadingSlice";
import { selectUserName } from "@/redux/slice/authSlice";
import { useSelector } from "react-redux";

const ChatClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const signout = () => {
    dispatch(SET_LOADING(true));
    signOut(auth)
      .then(() => {
        // toast.success("로그아웃 되었습니다.");
        dispatch(SET_LOADING(false));
        router.push("/");
      })
      .catch((error) => {
        // toast.error(error.message);
      });
  };

  useEffect(() => {
    if (!userName) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <div className="text-2xl font-bold mb-6 text-black">Chat</div>
        <div className="mb-4 text-sm text-gray-700">유저아이디: {userName}</div>
        <form>
          <button
            type="button"
            onClick={signout}
            className="bg-red-600 text-white rounded p-3 hover:bg-red-300 focus:outline-none hover:bg-green-300"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatClient;
