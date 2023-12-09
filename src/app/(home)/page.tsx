"use client";

import Sidebar from "@/component/sideBar/Sidebar";
import { auth, db } from "@/firebase/firebase";
import { serverTimestamp } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
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
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="flex flex-3">Home Page</div>
      
    </main>
  );
}
