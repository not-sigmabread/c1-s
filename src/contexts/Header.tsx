import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { currentUser } = useUser();
  const [currentTime, setCurrentTime] = useState(formatDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatDateTime(): string {
    const date = new Date();
    return `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${
      date.getUTCFullYear()}-${
      String(date.getUTCMonth() + 1).padStart(2, '0')}-${
      String(date.getUTCDate()).padStart(2, '0')} ${
      String(date.getUTCHours()).padStart(2, '0')}:${
      String(date.getUTCMinutes()).padStart(2, '0')}:${
      String(date.getUTCSeconds()).padStart(2, '0')}`;
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-info">
          <div className="time-display">{currentTime}</div>
          <div className="user-display">Current User's Login: {currentUser?.username || 'not logged in'}</div>
        </div>
      </div>
    </header>
  );
};
