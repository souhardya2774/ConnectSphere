
import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/mockApi';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, bio: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Failed to load current user", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const user = await loginUser(email, password);
    setCurrentUser(user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, bio: string) => {
    const user = await registerUser(name, email, password, bio);
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setCurrentUser(null);
  }, []);

  const value = { currentUser, loading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
