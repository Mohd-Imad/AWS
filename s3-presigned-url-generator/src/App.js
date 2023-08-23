import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your custom CSS file

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [presignedUrl, setPresignedUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const getPresignedURL = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      alert("Select a file");
      return;
    }

    try {
      const response = await axios.get(
        "https://m4mkv9q3tj.execute-api.ap-south-1.amazonaws.com/test/gen_presigned_url",
        { name: selectedFile.name }
      );

      console.log(response.data.body);
      setPresignedUrl(response.data.body);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input type="file" id="fileInput" onChange={handleFileChange} required />
        <label htmlFor="fileInput">Select File</label>
      </div>
      <div className="button-container">
        <button onClick={getPresignedURL}>Generate PreSigned URL</button>
      </div>
      {presignedUrl && (
        <div className="generated-url-container">
          <h5>Generated PreSigned URL:</h5>
          <p className="generated-url">{JSON.stringify(presignedUrl)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
