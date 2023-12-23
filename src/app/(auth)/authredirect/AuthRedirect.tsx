"use client";
import { usePathname, useRouter } from "next/navigation";
import { auth, createOrUpdateDB } from "@/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "@/redux/slice/authSlice";
const AuthRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 중입니당~");
        // router.push("/chat/main");
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
      createOrUpdateDB(user);
      dispatch(SET_ACTIVE_USER(user));
    }
  }, [user]);

  return null;
};

export default AuthRedirect;
