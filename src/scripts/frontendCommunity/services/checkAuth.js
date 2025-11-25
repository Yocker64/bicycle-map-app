import axios from 'axios';

const API_URL = "http://localhost:5000";

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add the JWT token
      },
      withCredentials: true,
    });
    return response.data.isAuthenticated; // Returns true if authenticated
  } catch (error) {
    console.error('Authentication check failed', error);
    return false;
  }
};
