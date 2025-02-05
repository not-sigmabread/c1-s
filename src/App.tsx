import React, { useState, useEffect } from 'react';
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
  email?: string;
  description?: string;
  joinDate: string;
}

// Mock users database
const MOCK_USERS: Record<string, User & { password: string }> = {
  'sigmabread': {
    id: '1',
    username: 'sigmabread',
    password: 'admin123',
    role: 'owner',
    status: 'online',
    email: 'sigmabread@example.com',
    description: 'Owner of the chat',
    joinDate: '2025-01-01'
  }
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = (username: string, password: string): boolean => {
    const user = MOCK_USERS[username];
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, password: string, email: string): boolean => {
    if (MOCK_USERS[username]) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      email,
      role: 'user' as const,
      status: 'online' as const,
      joinDate: new Date().toISOString().split('T')[0]
    };

    MOCK_USERS[username] = newUser;
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return true;
  };

  const handleGuestLogin = () => {
    const guestId = Math.random().toString(36).substring(7);
    const guestUser: User = {
      id: guestId,
      username: `Guest${guestId.substring(0, 4)}`,
      role: 'guest',
      status: 'online',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(guestUser);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="app-info">
            <div>Current Date and Time (UTC): {
              new Date().toISOString().replace('T', ' ').substring(0, 19)
            }</div>
            <div>Current User's Login: {currentUser?.username || 'not logged in'}</div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={
            currentUser ? 
            <Navigate to="/chat" /> : 
            <LandingPage 
              onLogin={handleLogin} 
              onGuestLogin={handleGuestLogin}
              onRegister={handleRegister}
            />
          } />
          <Route path="/chat" element={
            currentUser ? 
            <ChatPage currentUser={currentUser} /> : 
            <Navigate to="/" />
          } />
          <Route path="/profile/:username" element={
            <UserProfile currentUser={currentUser} />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
