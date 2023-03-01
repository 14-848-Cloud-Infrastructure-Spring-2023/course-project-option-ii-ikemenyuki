import React, { useState } from "react";

import styles from "../styles/styles";
import axios from "axios";
import { useRouter } from "next/router";

const url = "http://localhost:5000/api/search";
const data = {
  token: 123456,
};

const FileUploader = (loaded, setLoaded) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState([]);
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleFileInputChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
      // Make API call to upload the files using the formData
      // Make a POST request to the API endpoint on the second application
      // axios
      //   .get(url)
      //   .then((response) => {
      //     // Multiple instructions within the code block
      //     if (response.status === 200) {
      //       setResults(response.data);
      //       setError(null);
      //       handleLoaded();
      //       // navigate("/engine");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     if (error.code === "ECONNABORTED") {
      //       setError("The request timed out. Please try again.");
      //     } else {
      //       setError("An error occurred while processing your request.");
      //     }
      //     setResults([]);
      //   });
      handleLoaded();
    }
  };

  const handleLoaded = () => {
    // setLoaded(true);
    router.push({
      pathname: "/engine",
      query: { data },
    });
  };

  return (
    <div style={styles.alignCenter}>
      <label for="files" style={styles.labelButton}>
        Select file
        <input
          type="file"
          id="files"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </label>
      {selectedFiles.length !== 0 && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {selectedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
      {selectedFiles.length !== 0 && (
        <div style={styles.marginTopHeader}>
          <button style={styles.buttonStyle} onClick={handleFileUpload}>
            Load Engine
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
