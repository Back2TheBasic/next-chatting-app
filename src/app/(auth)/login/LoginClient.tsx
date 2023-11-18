"use client";
import { useState } from "react";
import styles from "./Login.module.scss";

import { auth } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginClient = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectChatPage = () => {
    router.push("/chat");
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("로그인에 성공했습니다.");
        redirectChatPage();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onClickGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("로그인에 성공했습니다.");
        redirectChatPage();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className={styles.page}>
      <h2>로그인</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            placeholder="이메일을 입력하세요"
            type="text"
            value={email}
            onChange={onChangeEmail}
            autoComplete="off"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onChangePassword}
            autoComplete="off"
          />
        </div>
        <Link href="/register" className={styles.link}>
          회원가입 페이지로 가기
        </Link>
        <button type="submit">로그인</button>
        <button type="button" onClick={onClickGoogleLogin}>
          Google 계정으로 로그인
        </button>
      </form>
    </div>
  );
};

export default LoginClient;
