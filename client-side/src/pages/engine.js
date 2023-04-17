import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../styles/styles";

const inter = Inter({ subsets: ["latin"] });

const Engine = () => {
  const router = useRouter();
  const data = router.query.data;

  const handleClickSearch = () => {
    // Navigate to the destination page when the button is clicked
    router.push({
      pathname: "/search-term",
      query: { data },
    });
  };

  const handleClickTopN = () => {
    // Navigate to the destination page when the button is clicked
    router.push({
      pathname: "/top-n",
      query: { data },
    });
  };

  return (
    <div>
      <div style={{ ...styles.center }}>
        <div style={styles.marginTopHeader}>
          <h1>Engine was loaded</h1>
          <br />
          <h1>&</h1>
          <br />
          <h1>Inverted indicies were constructed successfully!</h1>
          <br />
          <br />
          <h1>Please select actions</h1>
        </div>
        <div style={styles.marginTopHeader} onClick={handleClickSearch}>
          <button style={styles.buttonStyle}>Search for Term</button>
        </div>
        <div style={styles.marginTopHeader}>
          <button style={styles.buttonStyle} onClick={handleClickTopN}>
            Top N
          </button>
        </div>
      </div>
    </div>
  );
};

export default Engine;
