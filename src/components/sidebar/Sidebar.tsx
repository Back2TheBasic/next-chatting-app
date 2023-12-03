import React, { useEffect, useState } from "react";
import SidebarHeader from "./sidebarHeader/SidebarHeader";
import UserCard from "./userCard/UserCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserDB } from "@/firebase";
import { DocumentData } from "firebase/firestore";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [friends, setFriends] = useState<DocumentData[]>([]);
  useEffect(() => {
    const fetchUserDB = async () => {
      if (user?.email) {
        const fetchUser = await getUserDB(user.email);
        if (fetchUser) {
          setFriends(fetchUser);
        }
      }
    };

    fetchUserDB();
  }, [user?.email]);
  return (
    <div className="w-64">
      <SidebarHeader />
      {friends?.map((user, index) => (
        <UserCard
          key={`${user.email}-${index}`}
          photoURL={user.photoURL}
          displayName={user.displayName}
        />
      ))}
    </div>
  );
};

export default Sidebar;
