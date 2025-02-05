import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'guest' | 'user' | 'moderator' | 'admin' | 'owner';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  guestLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS = {
  'sigmabread': { 
    id: '1', 
    username: 'sigmabread', 
    password: 'admin123', 
    role: 'owner' as const 
  },
  'mod': { 
    id: '2', 
    username: 'mod', 
    password: 'mod123', 
    role: 'moderator' as const 
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    const mockUser = MOCK_USERS[username as keyof typeof MOCK_USERS];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const guestLogin = async () => {
    const guestUser = {
      id: `guest-${Math.random().toString(36).substr(2, 9)}`,
      username: `Guest${Math.floor(Math.random() * 1000)}`,
      role: 'guest' as const
    };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
