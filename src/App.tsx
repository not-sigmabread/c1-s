import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { AdminPanel } from './pages/AdminPanel';
import { UserProfile } from './pages/UserProfile';
import { Header } from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import './styles/variables.css';
import './styles/global.css';

export interface User {
  id: string;
  username: string;
  role: 'owner' | 'admin' | 'moderator' | 'user' | 'guest';
  status: 'online' | 'away' | 'offline' | 'dnd';
  joinDate: string;
  lastLogin: string;
  permissions: string[];
  profileData: {
    avatar?: string;
    customTitle?: string;
    badges: string[];
    level: number;
    xp: number;
    bio?: string;
    customTheme?: {
      primary: string;
      secondary: string;
    };
  };
}

const initialUsers: Record<string, { password: string } & User> = {
  'sigmabread': {
    id: '1',
    username: 'sigmabread',
    password: 'admin123',
    role: 'owner',
    status: 'online',
    joinDate: '2025-01-01',
    lastLogin: new Date().toISOString(),
    permissions: ['ADMIN', 'MODERATE', 'MANAGE_USERS', 'MANAGE_CHANNELS'],
    profileData: {
      badges: ['owner', 'founder', 'developer'],
      level: 100,
      xp: 10000,
      customTitle: 'Site Owner',
      customTheme: {
        primary: '#38bdf8',
        secondary: '#2563eb'
      }
    }
  }
};

const App: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (username: string, password: string): boolean => {
    const user = users[username];
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      const updatedUser = {
        ...userWithoutPassword,
        status: 'online',
        lastLogin: new Date().toISOString()
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const handleRegister = (username: string, password: string): boolean => {
    if (users[username]) {
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
      permissions: ['CHAT', 'EDIT_PROFILE'],
      profileData: {
        badges: ['newcomer'],
        level: 1,
        xp: 0
      }
    };

    setUsers(prev => ({
      ...prev,
      [username]: newUser
    }));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const handleLogout = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, status: 'offline' };
      setUsers(prev => ({
        ...prev,
        [currentUser.username]: { ...prev[currentUser.username], ...updatedUser }
      }));
    }
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <ThemeProvider>
        <UserProvider value={{ currentUser, users: Object.values(users), handleLogout }}>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    currentUser ? <Navigate to="/chat" /> : 
                    <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
                  } 
                />
                <Route 
                  path="/chat/*" 
                  element={
                    currentUser ? <ChatPage /> : <Navigate to="/" />
                  } 
                />
                <Route 
                  path="/admin/*" 
                  element={
                    currentUser?.role === 'owner' ? <AdminPanel /> : <Navigate to="/chat" />
                  } 
                />
                <Route 
                  path="/profile/:username" 
                  element={
                    currentUser ? <UserProfile /> : <Navigate to="/" />
                  } 
                />
              </Routes>
            </main>
          </div>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
