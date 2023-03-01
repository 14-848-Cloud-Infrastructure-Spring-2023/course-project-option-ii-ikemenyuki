import React, { useState, useEffect } from "react";

import FileUploader from "../components/FileUploader";
import styles from "..//styles/styles";

const Upload = (loaded, setLoaded) => {
  return (
    <div>
      <h1 style={{ fontSize: "1rem" }}>Welcome to Yueqi Liao Search Engine</h1>
      <div style={{ ...styles.center }}>
        <div>
          <h1>Load My Engine</h1>
        </div>
        <div>
          <FileUploader loaded={loaded} setLoaded={setLoaded} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
