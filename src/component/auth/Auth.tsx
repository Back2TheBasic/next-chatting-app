"use client";
import { auth, db } from "@/firebase/firebase";
import { authStore } from "@/states/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ScreenLoader from "../loading/screenLoader/ScreenLoader";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "@/app/(auth)/login/page";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const [authInfo, setAuthInfo] = useRecoilState(authStore);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastActive: serverTimestamp(),
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        { merge: true }
      );

      setAuthInfo((prev) => ({
        ...prev,
        nickname: user?.displayName || "",
        email: user?.email || "",
        profile_image: user?.photoURL || "",
      }));
    }
  }, [user, setAuthInfo]);

  if (loading) {
    return <ScreenLoader />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default Auth;
