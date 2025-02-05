import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
  onGuestLogin: () => void;
  onRegister: (username: string, password: string, email: string) => boolean;
}

const LandingPage: React.FC<LoginProps> = ({ onLogin, onGuestLogin, onRegister }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (onRegister(formData.username, formData.password, formData.email)) {
        navigate('/chat');
      } else {
        setError('Username already taken');
      }
    } else {
      if (onLogin(formData.username, formData.password)) {
        navigate('/chat');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleGuestLogin = () => {
    onGuestLogin();
    navigate('/chat');
  };

  return (
    <div className="landing-container">
      <div className="auth-box">
        <h1>Welcome to Chat</h1>
        
        <div className="auth-tabs">
          <button 
            className={!isRegistering ? 'active' : ''} 
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button 
            className={isRegistering ? 'active' : ''} 
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            {isRegistering ? 'Create Account' : 'Login'}
          </button>

          <div className="separator">
            <span>OR</span>
          </div>

          <button 
            type="button" 
            className="guest-button"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
