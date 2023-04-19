import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/styles";
import dataset from "../testdataset/dataset.json";
import Grid from "../components/Grid";

const inter = Inter({ subsets: ["latin"] });

const SearchResult = () => {
  const router = useRouter();
  const value = router.query.value;
  const [filterBy, setFilterBy] = useState(value);
  const [data, setData] = useState([]);
  const execTime = router.query.execTime;

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
        <h1>{"You searched for the term: " + filterBy}</h1>
        <h1>{`Your search was executed in ${execTime} ms`}</h1>
      </div>
      <div style={styles.marginTopHeader}>
        <Grid data={data} term={value} filterBy={filterBy} setFilterBy={setFilterBy} isSearch={true} />
      </div>
    </div>
  );
};

export default SearchResult;
