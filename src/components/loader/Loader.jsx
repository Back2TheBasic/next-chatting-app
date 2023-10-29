"use client";

import React from "react";
import styles from "./Loader.module.scss";
import { RotatingLines } from "react-loader-spinner";
import { selectIsLoading } from "@/redux/slice/loadingSlice";
import { useDispatch, useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      {isLoading && (
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
