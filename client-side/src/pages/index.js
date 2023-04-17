import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";

import styles from "../styles/styles";
import FileUploader from "../components/FileUploader";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.get(`http://backend-service/search?q=${query}`)
  //     .then(response => setResults(response.data.results))
  //     .catch(error => console.log(error));
  // };

  useEffect(() => {}, [loaded]);

  return (
    <div>
      <div style={{ ...styles.center }}>
        <div style={styles.marginTopHeader}>
          <h1>Load My Engine</h1>
        </div>
        <div style={styles.marginTopUpload}>
          <FileUploader loaded={loaded} setLoaded={setLoaded} />
        </div>
      </div>
    </div>
  );
};

export default Home;
