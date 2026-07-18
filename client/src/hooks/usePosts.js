import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/client';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (postData) => {
    try {
      const { data } = await api.createPost(postData);
      setPosts(prev => [data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deletePost = async (id) => {
    try {
      await api.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await api.likePost(id);
      setPosts(prev => prev.map(p => p.id === id ? data : p));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    deletePost,
    likePost,
    refreshPosts: fetchPosts
  };
};
