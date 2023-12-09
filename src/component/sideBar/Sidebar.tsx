"use client";
import React from "react";

import styles from "./chat.module.scss";
import Profile from "../../app/chat/[id]/Profile";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

import { useCollection } from "react-firebase-hooks/firestore";
import { DocumentData, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const makeChatId = (myId: string, opId: string) =>
    `${[myId.slice(0, 5), opId.slice(0, 5)].sort()}`;

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
            onClick={() =>
              onClick(makeChatId(my?.displayName || "", user.displayName))
            }
          >
            <Profile profileSrc={user.photoURL} nickname={user.displayName} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
