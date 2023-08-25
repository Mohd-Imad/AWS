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
      const response = await axios.post(
        "https://m4mkv9q3tj.execute-api.ap-south-1.amazonaws.com/test/gen_new_ps_url",
      );
      let name = selectedFile.name
        console.log(response)
      setPresignedUrl({ result: { imageUrl: response.data.body, imageName: name } });
      // console.log(presignedUrl.result)
      // console.log(presignedUrl.result.imageUrl)
      // console.log(presignedUrl.result.imageName)
    } catch (error) {
      console.error("Error:", error.message);
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
          <p className="generated-url">{JSON.stringify(presignedUrl.result)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
