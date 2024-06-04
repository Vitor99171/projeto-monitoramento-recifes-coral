// SpeciesIdentification.jsx

import React, { useState } from 'react';
import '../components/SpeciesIdentification.css';

const SpeciesIdentification = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        const resultUrl = `http://127.0.0.1:5000${data.result_image_url}`;
        setResult(resultUrl);
        setHistory([...history, resultUrl]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="species-identification">
      <h2>Identificação de Espécies</h2>
      <label className="custom-file-upload">
        <input type="file" onChange={handleUploadImage} />
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5-5 5 5M12 15V3"></path>
          </svg>
        </div>
        <div className="text">
          <span>Carregar Imagem</span>
        </div>
      </label>
      {image && <img src={image} alt="Uploaded" />}
      {result && <img src={result} alt="Result" />}
      <h3>Histórico</h3>
      <div className="history">
        {history.map((item, index) => (
          <img key={index} src={item} alt={`Result ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default SpeciesIdentification;
