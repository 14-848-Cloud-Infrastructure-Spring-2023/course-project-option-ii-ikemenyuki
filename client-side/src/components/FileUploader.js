import React, { useState } from "react";

import styles from "../styles/styles";
import { useRouter } from "next/router";


const FileUploader = ({ setLoaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const router = useRouter();

  const handleFileInputChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const t0 = performance.now(); // start timer
        setLoaded(true); // set loaded to true before sending the request
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Files uploaded successfully.");
          const data = await response.json();
          // Save the data in local storage
          localStorage.setItem("hadoop-data", JSON.stringify(data));
          console.log("Data stored in localStorage:", data);

          // Check if the data has been set successfully
          const storedData = localStorage.getItem("hadoop-data");
          if (storedData) {
            console.log("Data stored successfully:", JSON.parse(storedData));
          } else {
            console.log("Failed to store the data");
          }

          const t1 = performance.now(); // end timer
          const execTime = t1 - t0;
          console.log(execTime);
          setLoaded(false); // set loaded to false when the response is received
          handleLoaded(execTime);
        } else {
          console.error("Failed to upload files.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLoaded = (execTime) => {
    // setLoaded(true);
    router.push({
      pathname: "/engine",
      query: { execTime }
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
