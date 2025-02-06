import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { currentUser, handleLogout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(date: Date): string {
    return date.toISOString()
      .replace('T', ' ')
      .slice(0, 19);
  }
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="header-time">
            {currentTime} UTC
          </span>
        </div>
        <div className="header-right">
          {currentUser ? (
            <div className="user-info">
              <span className={`status-dot status-${currentUser.status}`} />
              <span className={`username role-${currentUser.role}`}>
                {currentUser.username}
              </span>
              <button 
                className="btn btn-icon" 
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="not-logged-in">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
};
