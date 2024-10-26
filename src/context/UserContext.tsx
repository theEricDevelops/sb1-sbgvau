import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@companycam.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Project Manager',
  company: 'CompanyCam'
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}