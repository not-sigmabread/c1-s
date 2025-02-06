import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { currentUser, handleLogout } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="header-time">
            {new Date().toISOString().replace('T', ' ').slice(0, 19)}
          </span>
        </div>
        <div className="header-right">
          {currentUser ? (
            <div className="user-info">
              <span className={`status-dot status-${currentUser.status}`} />
              <span className={`username role-${currentUser.role}`}>
                {currentUser.username}
              </span>
              <button className="btn btn-icon" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
};
