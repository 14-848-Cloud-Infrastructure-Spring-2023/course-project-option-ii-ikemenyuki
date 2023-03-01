import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/styles";

const TopN = () => {
  const router = useRouter();
  const data = router.query.data;
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    if (value.length) {
      router.push({
        pathname: "/top-n-result",
        query: { ...data, value: value },
      });
    }
  };

  return (
    <div>
      <div style={{ ...styles.center }}>
        <div style={styles.marginTopHeader}>
          <h1>Enter Your N Value</h1>
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            style={styles.inputBox}
          />
        </div>
        <div style={styles.marginTopHeader}>
          <button style={styles.buttonStyle} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopN;
