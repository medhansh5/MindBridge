import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Posts ---
export const fetchPosts = () => api.get('/posts');

export const createPost = (data) => api.post('/posts', data);

export const deletePost = (id) => api.delete(`/posts/${id}`);

export const likePost = (id) => api.post(`/posts/${id}/like`);

// --- Replies ---
export const fetchReplies = (postId) => api.get(`/posts/${postId}/replies`);

export const createReply = (postId, data) => api.post(`/posts/${postId}/replies`, data);

// --- Peer Matching ---
export const getAvailableListeners = () => api.get('/peers/available');

export const requestPeerMatch = () => api.post('/peers/request');

export const volunteerAsListener = (sessionId) => api.post('/peers/volunteer', { sessionId });

export const removeVolunteer = (sessionId) => api.delete(`/peers/volunteer/${sessionId}`);

export default api;
