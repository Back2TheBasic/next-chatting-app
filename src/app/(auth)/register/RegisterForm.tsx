import { useState } from "react";
import styles from "./register.module.scss";

import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "@/component/input/passwordInput/PasswordInput";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isNotSameConfirmPassword =
    !!password && !!confirmPassword && password !== confirmPassword;

  const redirectChatPage = () => {
    router.push("/chat");
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.error("이메일 형식이 올바르지않습니다.");
    }

    if (isNotSameConfirmPassword) {
      return toast.error("비밀번호가 일치하지않습니다.");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("회원가입에 성공했습니다.");
        redirectChatPage();
      })
      .catch((error) => {
        const errorMessage = error.message;

        toast.error(errorMessage);
      });
  };

  return (
    <div>
      <h2>회원가입</h2>
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
          {!isValidEmail && (
            <span className={styles.errorMessage}>
              이메일 형식이 올바르지않습니다.
            </span>
          )}
        </div>
        <PasswordInput
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <PasswordInput
          type="confirm"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          errorMessage={
            isNotSameConfirmPassword ? "비밀번호가 일치하지않습니다" : ""
          }
        />

        <Link href="/login" className={styles.link}>
          로그인 페이지로 가기
        </Link>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterForm;
