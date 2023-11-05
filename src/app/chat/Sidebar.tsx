import React from "react";

import styles from "./chat.module.scss";
import Profile from "./Profile";

const users = [
  { id: 1, nickname: "sangwon", profileSrc: "/profile_image_default.jpeg" },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <h3>채팅</h3>
        <button>로그아웃</button>
      </div>
      <div className={styles.sidebar_list}>
        {users.map((user) => (
          <div key={user.id} className={styles.sidebar_profileCard}>
            <Profile profileSrc={user.profileSrc} nickname={user.nickname} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
