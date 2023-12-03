"use client";
import { usePathname, useRouter } from "next/navigation";
import { auth, updateUserDB } from "@/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const AuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 중입니당~");
        router.push("/chat");
      } else if (
        pathname !== "/signin" &&
        pathname !== "/signup" &&
        !currentUser
      ) {
        router.push("/signin");
      }
    });
  };
  useEffect(() => {
    checkLogin();
  }, [pathname]);

  useEffect(() => {
    if (user) {
      updateUserDB(user);
    }
  }, [user]);

  return null;
};

export default AuthRedirect;
