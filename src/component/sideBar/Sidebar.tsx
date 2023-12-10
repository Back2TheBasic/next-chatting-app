"use client";
import React from "react";

import styles from "./sidebar.module.scss";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

import { useCollection } from "react-firebase-hooks/firestore";
import { DocumentData, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "../profile/Profile";

const Sidebar = () => {
  const [my] = useAuthState(auth);
  const router = useRouter();

  const [snapshotUser] = useCollection(collection(db, "users"));

  const users =
    snapshotUser?.docs.map((doc: DocumentData) => ({
      id: doc.id,
      ...doc.data(),
    })) || [];
  const filteredUsers = users?.filter(
    (singleUser) => singleUser.email !== my?.email
  );

  const logout = () => {
    signOut(auth);
    router.push("/login");
  };

  const onClick = (id: string) => {
    router.push(`/chat/${id}`);
  };

  // 실시간데이터베이스 id찾아보기
  const makeChatId = (myEmail: string, opEmail: string) => {
    return [myEmail.split("@")[0], opEmail.split("@")[0]].sort().join("&");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <h3>채팅</h3>
        <button onClick={logout}>로그아웃</button>
      </div>
      <div className={styles.sidebar_list}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={styles.sidebar_profileCard}
            onClick={() => onClick(makeChatId(my?.email || "", user.email))}
          >
            <Profile
              profileSrc={user.photoURL}
              nickname={user.displayName || user.email}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
