"use client";

import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.spinner}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#AEDEFC"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </article>
    </section>
  );
};

export default Loader;
