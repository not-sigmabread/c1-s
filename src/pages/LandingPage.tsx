import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
  onRegister: (username: string, password: string) => boolean;
}

export const LandingPage: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (onRegister(formData.username, formData.password)) {
          navigate('/chat');
        } else {
          throw new Error('Username already taken');
        }
      } else {
        if (onLogin(formData.username, formData.password)) {
          navigate('/chat');
        } else {
          throw new Error('Invalid username or password');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  return (
    <div className="landing-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Welcome to Chat</h1>
          <p className="auth-subtitle">
            {isRegistering 
              ? 'Create an account to get started' 
              : 'Sign in to continue to chat'}
          </p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${!isRegistering ? 'active' : ''}`}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${isRegistering ? 'active' : ''}`}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
                disabled={loading}
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="input-with-icon"
              />
            </div>
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className="input-with-icon"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              isRegistering ? 'Create Account' : 'Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isRegistering ? (
              <>Already have an account? <button className="link-button" onClick={() => setIsRegistering(false)}>Login</button></>
            ) : (
              <>Don't have an account? <button className="link-button" onClick={() => setIsRegistering(true)}>Register</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
