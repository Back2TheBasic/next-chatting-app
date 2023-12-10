"use client";
import { signOut } from "firebase/auth";
import styles from "../Layout.module.scss";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { authStore } from "@/states/auth";
import { useRecoilValue } from "recoil";

const Header = () => {
  const router = useRouter();
  const isLogin = !!useRecoilValue(authStore).email;

  const onClickLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃되었습니다.");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <span>Logo</span>
      {isLogin ? (
        <button onClick={onClickLogout}>Logout</button>
      ) : (
        <button onClick={onClickLogin}>Login</button>
      )}
    </header>
  );
};

export default Header;
