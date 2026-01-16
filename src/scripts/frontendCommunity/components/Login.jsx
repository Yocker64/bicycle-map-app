import { useState } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to hold the error message

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL =  "http://10.40.211.54:5000/";
      const response = await api({
        method: 'post',
        url: `${API_BASE_URL}/auth/login`,
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        data: formData, // Send the form data as JSON
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        localStorage.setItem('userId', userId);
        window.location.href = '/feed'; // Redirect to home page
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('ログインに失敗しました。ユーザー名とパスワードを確認し、もう一度お試しください。');
    }
  };

  const handleDemoLogin = async () => {
    try {
      const API_BASE_URL =  "http://10.40.211.54:5000";
      const response = await api({
        method: 'post',
        url: `${API_BASE_URL}/auth/login/demo`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        localStorage.setItem('userId', userId);
        window.location.href = '/feed';
      }
    } catch (error) {
      console.error('Demo login failed', error);
      setError('デモアカウントにログインできません。後でもう一度お試しください。');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">ログイン</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 black-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="ユーザー名を入力してください"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 black-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="パスワードを入力してください"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Display error message if exists */}
        <button
          type="submit"
          className="w-full p-3 bg-black-600 text-white font-semibold rounded-lg hover:bg-black-700 transition-colors duration-300"
        >
          ログイン
        </button>
        {/* Demo Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full p-3 bg-black-600 text-white font-semibold rounded-lg hover:bg-black-700 transition-colors duration-300 mt-4"
        >
          デモを試す
        </button>
      </form>
    </div>
  );
};

export default Login;