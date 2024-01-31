import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io();

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts on mount
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    // Listen for real-time updates
    socket.on('updateLikes', (data) => {
      const updatedPosts = posts.map((post) =>
        post.id === data.postId ? { ...post, likes: data.likes } : post
      );
      setPosts(updatedPosts);
    });
  }, [posts]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post('/api/likes', { postId });
      socket.emit('likePost', response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <img src={post.image} alt={post.description} style={{ maxWidth: '300px' }} />
          <p>{post.description}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;