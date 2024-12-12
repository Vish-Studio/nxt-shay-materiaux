import { useLocalStorage } from '@/hooks/use-local-storage';
import { authApi } from '@/services/api/auth';
import type { IUser } from '@/types/api/user';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextState {
  user: IUser | null;
}

export const initialState: AuthContextState = {
  user: null
};

export interface AuthContextType extends AuthContextState {
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve()
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedUser] = useLocalStorage('user');
  const [user, setUser] = useState<IUser | null>(storedUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async (credentials: any) => {
    const response = await authApi.authenticate(credentials);
    if (response.status == 200) {
      setUser(response.data);
    }
    return response.data;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Show loading state until we determine authentication status
  // if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
