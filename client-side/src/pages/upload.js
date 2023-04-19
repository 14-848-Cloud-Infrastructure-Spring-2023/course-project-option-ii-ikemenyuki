import React, { useState, useEffect } from "react";

import FileUploader from "../components/FileUploader";
import styles from "..//styles/styles";

const Upload = () => {
  const [loaded, setLoaded] = useState(false); // initialize loaded to false
  console.log(loaded);
  console.log("whatup");
  return (
    <div>
      <h1 style={{ fontSize: "1rem" }}>Welcome to Yueqi Liao Search Engine</h1>
      <div style={{ ...styles.center }}>
        {loaded ? (
          <Spinner /> // display spinner when loaded is true
        ) : (
          <div>
            <h1>Load My Engine</h1>
            <FileUploader setLoaded={setLoaded} />

          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
