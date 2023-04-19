import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/styles";
import dataset from "../testdataset/dataset-topn.json";
import Grid from "../components/Grid";

const TopNResult = () => {
  const router = useRouter();

  const [n, setN] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve the data from local storage
    const storedData = localStorage.getItem('hadoop-data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      <div
        style={{
          textAlign: "right",
          fontSize: "20px",
          color: "blue",
          marginTop: "2rem",
          textDecoration: "underline",
        }}
      >
        <Link href="/engine">
          <h1>Go Back To Search</h1>
        </Link>
      </div>
      <div
        style={{
          textAlign: "left",
          fontSize: "15px",
          marginTop: "1rem",
        }}
      >
        <h1>Top-N Frequent Terms</h1>
      </div>
      <div style={styles.marginTop}>
        <Grid data={data} n={n} setN={setN} />
      </div>
    </div>
  );
};

export default TopNResult;
