import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post(
        "https://m4mkv9q3tj.execute-api.ap-south-1.amazonaws.com/test/gen_presigned_url",
        { name: selectedFile.name }
      );

      console.log(response);
      setPresignedUrl(response.data.presignedUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={getPresignedURL}>Generate PreSigned URL</button>
      {presignedUrl && (
        <div>
          <p>Generated PreSigned URL:</p>
          <a href={presignedUrl} target="_blank" rel="noopener noreferrer">Upload File</a>
        </div>
      )}
    </div>
  );
};

export default App;
