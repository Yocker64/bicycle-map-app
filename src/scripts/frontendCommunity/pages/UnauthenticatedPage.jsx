import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import '../styles/UnauthenticatedPage.css';

const UnauthenticatedPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="unauthenticated-container">
      <div className="unauthenticated-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">
            <span className="accent-text">Link</span>へようこそ
          </h2>
        </div>

        {/* Form Section */}
        <div className="form-section">
          {/* Conditional Form Rendering */}
          {isLogin ? (
            <>
              <Login />
              <div className='divider'></div>
              <button
                onClick={toggleForm}
                className="toggle-button"
              >
                アカウントをお持ちではありませんか？新規登録
              </button>
            </>
          ) : (
            <>
              <SignUp />
              <div className='divider'></div>
              <button
                onClick={toggleForm}
                className="toggle-button"
              >
                すでにアカウントをお持ちですか？ログイン
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedPage;