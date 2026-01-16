import axios from 'axios';

const api = axios.create({
  baseURL: "http://10.40.211.54:5000", // Base URL for all requests
});

// Request interceptor to add the token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
