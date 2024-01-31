import React, { useState } from 'react';
import PhotoUpload from './components/PhotoUpload';
import Posts from './components/Posts';

const Home = () => {
  // Define state for posts using useState
  const [posts, setPosts] = useState([]);

  const handleUpload = (newPost) => {
    // Add the new post to the state
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1>Instagram Clone</h1>
      <PhotoUpload onUpload={handleUpload} />
      <Posts posts={posts} />
    </div>
  );
};

export default Home;