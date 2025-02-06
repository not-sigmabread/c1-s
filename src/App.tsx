import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import { useIdle } from './hooks/useIdle';
import './styles/main.css';

export interface User {
  id: string;
  username: string;
  role: 'owner' | 'admin' | 'moderator' | 'user' | 'guest';
  status: 'online' | 'away' | 'offline';
  description?: string;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
  activityLog: ActivityLog[];
  customProfile?: {
    backgroundColor?: string;
    textColor?: string;
    badges: string[];
    level: number;
    points: number;
  };
}

interface ActivityLog {
  type: 'login' | 'message' | 'channel_join' | 'profile_update' | 'moderation_action';
  timestamp: string;
  details: string;
}

// Move MOCK_USERS to a class-level constant
const INITIAL_MOCK_USERS: Record<string, User & { password: string }> = {
  'sigmabread': {
    id: '1',
    username: 'sigmabread',
    password: 'admin123',
    role: 'owner',
    status: 'offline',
    description: 'Owner of the chat',
    joinDate: '2025-01-01',
    lastLogin: new Date().toISOString(),
    permissions: ['ADMIN_PANEL', 'MANAGE_USERS', 'MANAGE_CHANNELS', 'MODERATE_CONTENT', 'VIEW_LOGS'],
    activityLog: [],
    customProfile: {
      backgroundColor: '#1a1a2e',
      textColor: '#gold',
      badges: ['owner', 'founder', 'developer'],
      level: 100,
      points: 10000
    }
  }
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mockUsers, setMockUsers] = useState(INITIAL_MOCK_USERS);
  const isIdle = useIdle(300000);

  useEffect(() => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        status: isIdle ? 'away' : 'online',
        lastLogin: new Date().toISOString()
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  }, [isIdle]);

  const handleLogin = (username: string, password: string): boolean => {
    const user = mockUsers[username];
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      const updatedUser = {
        ...userWithoutPassword,
        status: 'online',
        lastLogin: new Date().toISOString(),
        activityLog: [
          ...userWithoutPassword.activityLog,
          {
            type: 'login',
            timestamp: new Date().toISOString(),
            details: 'User logged in'
          }
        ]
      };
      setCurrentUser(updatedUser);
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, password: string): boolean => {
    if (mockUsers[username]) {
      return false;
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username,
      password,
      role: 'user',
      status: 'online',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString(),
      permissions: ['CHAT', 'UPDATE_PROFILE'],
      activityLog: [{
        type: 'login',
        timestamp: new Date().toISOString(),
        details: 'Account created'
      }],
      customProfile: {
        backgroundColor: '#1a1a2e',
        textColor: '#ffffff',
        badges: ['newcomer'],
        level: 1,
        points: 0
      }
    };

    setMockUsers(prev => ({
      ...prev,
      [username]: newUser
    }));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return true;
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
            <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
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
