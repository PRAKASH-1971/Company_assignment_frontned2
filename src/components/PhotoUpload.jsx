import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);

      const response = await axios.post('/api/posts', formData);
      onUpload(response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Add a description..." onChange={handleDescriptionChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PhotoUpload;