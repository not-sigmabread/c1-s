import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { currentUser, handleLogout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(formatDate(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-info">
          <div className="header-time">
            Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {currentTime}
          </div>
          <div className="header-user">
            Current User's Login: {currentUser?.username || 'not logged in'}
          </div>
        </div>
        <div className="header-controls">
          {currentUser && (
            <div className="user-controls">
              <div className={`status-indicator status-${currentUser.status}`}>
                <span className="status-dot" />
                <span className="status-text">{currentUser.status}</span>
              </div>
              <div className={`user-role role-${currentUser.role}`}>
                {currentUser.role}
              </div>
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
