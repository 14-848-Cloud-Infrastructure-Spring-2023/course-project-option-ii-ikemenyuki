import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../styles/styles";
import FileUploader from "../components/FileUploader";

const inter = Inter({ subsets: ["latin"] });

const SearchTerm = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    if (value.length) {
      router.push({
        pathname: "/search-result",
        query: { value }
      });
    }
  };

  return (
    <div>
      <div style={{ ...styles.center }}>
        <div style={styles.marginTopHeader}>
          <h1>Enter Your Search Term</h1>
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

export default SearchTerm;
