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

      // Set up credentials and storage client
      const storage = require("@google-cloud/storage");
      const storageClient = new storage.Storage({
        keyFilename: "~/documents/keys/project1_gcs.json",
      });

      // Set up bucket
      const bucketName = "final-project-bucket-nico";
      const bucket = storageClient.bucket(bucketName);
      // Upload files to bucket
      selectedFiles.forEach(async (file) => {
        const blob = bucket.file(file.name);
        const blobStream = blob.createWriteStream();
        blobStream.on("error", (error) => {
          console.log(error);
        });
        blobStream.on("finish", () => {
          console.log(`File ${file.name} uploaded to ${bucketName}`);
        });
        blobStream.end(file.data);
      });
      
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
