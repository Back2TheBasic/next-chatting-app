"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  const getDisplayNameFromEmail = (email: string) => {
    const u1 = email?.substring(0, email.indexOf("@")) || "";
    return u1?.charAt(0).toUpperCase() + u1?.slice(1);
  };

  const signIn = (user: {
    displayName: string;
    email: string;
    uid: string;
  }) => {
    const name = user.displayName || displayName;
    dispatch(
      SET_ACTIVE_USER({
        email: user.email,
        userName: name,
        userID: user.uid,
      })
    );
    router.push("/chat");
  };

  const signOut = () => {
    setDisplayName("");
    dispatch(REMOVE_ACTIVE_USER());
    router.push("/signin");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          const name = getDisplayNameFromEmail(user.email as string);
          setDisplayName(name);
        } else {
          setDisplayName(user.displayName);
        }
        signIn(user as { displayName: string; email: string; uid: string });
      } else {
        signOut();
      }
    });
  }, [dispatch, displayName]);

  return <main className="grid bg-white">메인 페이지~!</main>;
}
