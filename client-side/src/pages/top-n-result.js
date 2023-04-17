import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/styles";
import dataset from "../testdataset/dataset-topn.json";
import Grid from "../components/Grid";

const TopNResult = () => {
  const router = useRouter();
  const data = router.query.value;

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
        <Grid data={dataset} />
      </div>
    </div>
  );
};

export default TopNResult;
