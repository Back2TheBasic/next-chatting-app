"use client";
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

interface LoginProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ setLogin, setUserId }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        // user data 설정
        console.log(data?.user?.email);
        setLogin(true);
        setUserId(data?.user?.email as string);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user?.email);
        setLogin(true);
        setUserId(user?.email as string);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log("error", error);
      });
  };

  return (
    <section className="flex flex-col place-items-center justify-center min-h-screen bg-gray-100">
      {/* min-h-screen  min-height: 100vh;*/}
      <h1 className="text-2xl font-bold mb-6 text-black">로그인</h1>
      {/* margin bottom mb-6 1.5rem (24) */}
      <form className="bg-white p-6 rounded shadow-md w-96">
        {/* p-6 padding 1.5 rem (24) */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {/* text-sm font-size 7? 0.875rem lien-height 1.25rem */}
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하시오"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md text-black"
          />
          {/* w-full width 100% border 1px 두께의 실선 추가 (border 1px ...) */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하시오"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:border-indigo-500 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={signin}
            className="bg-green-500 text-white rounded-md p-3 hover:bg-green-300 focus:outline-none"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={googleLogin}
            className="bg-blue-500 text-white rounded-md p-3 hover:bg-blue-300 focus:outline-none "
          >
            구글 계정으로 로그인
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
