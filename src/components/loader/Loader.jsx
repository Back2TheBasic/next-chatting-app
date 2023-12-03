"use client";

import React from "react";
import styles from "./Loader.module.scss";
import { RotatingLines } from "react-loader-spinner";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Loader = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      {loading && (
        <div className={styles.wrapper}>
          <div className={styles.loader}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
