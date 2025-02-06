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
  ipAddress?: string;
  isBanned?: boolean;
  banReason?: string;
  banExpiration?: string;
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

// Mock users database with enhanced features
const handleRegister = (username: string, password: string): boolean => {
  if (MOCK_USERS[username]) {
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

  MOCK_USERS[username] = newUser;
  const { password: _, ...userWithoutPassword } = newUser;
  setCurrentUser(userWithoutPassword);
  return true;
};

// Admin channels configuration
const ADMIN_CHANNELS = [
  {
    id: 'admin-dashboard',
    name: '🛡️ Admin Dashboard',
    type: 'admin',
    description: 'Administrative controls and monitoring',
    allowedRoles: ['owner', 'admin']
  },
  {
    id: 'mod-logs',
    name: '📝 Moderation Logs',
    type: 'admin',
    description: 'View all moderation actions',
    allowedRoles: ['owner', 'admin', 'moderator']
  }
];

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Use the idle hook to track user activity
  const isIdle = useIdle(300000); // 5 minutes

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

  // Handle window focus/blur for online status
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          status: document.hidden ? 'away' : 'online'
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  const handleLogin = (username: string, password: string): boolean => {
    const user = MOCK_USERS[username];
    if (user && user.password === password && !user.isBanned) {
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
    if (MOCK_USERS[username]) {
      return false;
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username,
      password,
      role: 'user',
      status: 'online',
      joinDate: new Date().toISOString(),
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

    MOCK_USERS[username] = newUser;
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return true;
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="app-info">
            <div>
              Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {
                new Date().toISOString().replace('T', ' ').slice(0, 19)
              }
            </div>
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
            <ChatPage 
              currentUser={currentUser} 
              adminChannels={currentUser.role === 'owner' ? ADMIN_CHANNELS : []}
            /> : 
            <Navigate to="/" />
          } />
          <Route path="/admin/*" element={
            currentUser?.role === 'owner' ? 
            <AdminPanel currentUser={currentUser} /> : 
            <Navigate to="/chat" />
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
