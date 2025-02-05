import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import UserProfile from './components/UserProfile';
import './styles/main.css';

export interface User {
  id: string;
  username: string;
  role: 'owner' | 'admin' | 'moderator' | 'user' | 'guest';
  status: 'online' | 'away' | 'offline';
  description?: string;
  joinDate: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'announcements' | 'chat' | 'links';
  description: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    if (username === 'sigmabread' && password === 'admin123') {
      setCurrentUser({
        id: '1',
        username: 'sigmabread',
        role: 'owner',
        status: 'online',
        description: 'Owner of the chat',
        joinDate: '2025-01-01'
      });
      return true;
    }
    return false;
  };

  const handleGuestLogin = () => {
    const guestId = Math.random().toString(36).substring(7);
    setCurrentUser({
      id: guestId,
      username: `Guest${guestId}`,
      role: 'guest',
      status: 'online',
      joinDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="app-info">
            <div>Current Date and Time (UTC): {new Date().toISOString().slice(0, 19).replace('T', ' ')}</div>
            <div>Current User's Login: {currentUser?.username || 'not logged in'}</div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={
            currentUser ? 
            <Navigate to="/chat" /> : 
            <LandingPage onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
          } />
          <Route path="/chat" element={
            currentUser ? 
            <ChatPage currentUser={currentUser} /> : 
            <Navigate to="/" />
          } />
          <Route path="/profile/:username" element={<UserProfile currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
