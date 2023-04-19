import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";

import styles from "../styles/styles";
import FileUploader from "../components/FileUploader";
import Spinner from "../components/Spinner";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { }, [loaded]);

  return (
    <div>
      <div style={{ ...styles.center }}>
        {loaded ? (<Spinner />) :
          <div>
            <div style={styles.marginTopHeader}>
              <h1>Load My Engine</h1>
            </div>
            <div style={styles.marginTopUpload}>
              <FileUploader setLoaded={setLoaded} />
            </div>
          </div>}

      </div>
    </div>
  );
};

export default Home;
