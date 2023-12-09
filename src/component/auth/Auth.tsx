"use client";
import { auth } from "@/firebase/firebase";
import { authInfoState } from "@/states/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ScreenLoader from "../loading/screenLoader/ScreenLoader";

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      setAuthInfo((prev) => ({
        ...prev,
        nickname: user?.displayName || "",
        email: user?.email || "",
      }));
      setIsLoading(false);
    });
  }, [setAuthInfo, setIsLoading]);

  return <>{isLoading ? <ScreenLoader /> : children}</>;
};

export default Auth;
