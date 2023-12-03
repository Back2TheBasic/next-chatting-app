import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const Chat = ({ setLogin, userId }: any) => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 되었습니다");
        setLogin(false);
      })
      .catch((error) => {
        console.log("로그아웃 오류!", error);
      });
    console.log("로그아웃합니다!");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <div className="text-2xl font-bold mb-6 text-black">Chat</div>
        <div className="mb-4 text-sm text-gray-700">유저아이디: {userId}</div>
        <form>
          <button
            type="button"
            onClick={logout}
            className="bg-red-600 text-white rounded p-3 hover:bg-red-300 focus:outline-none"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
