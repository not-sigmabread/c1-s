import React, { createContext, useContext } from 'react';
import { User } from '../App';

interface UserContextType {
  currentUser: User | null;
  users: User[];
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  handleLogout: () => {}
});

export const UserProvider: React.FC<UserContextType & { children: React.ReactNode }> = ({ 
  children,
  currentUser,
  users,
  handleLogout
}) => {
  return (
    <UserContext.Provider value={{ currentUser, users, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
