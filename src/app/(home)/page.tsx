"use client";

import Sidebar from "@/component/sideBar/Sidebar";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <Sidebar />
      <div className={styles.main}>home Page</div>
    </main>
  );
}
