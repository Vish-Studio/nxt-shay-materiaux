import { useLocalStorage } from '@/hooks/use-local-storage';
import { authApi } from '@/services/api/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextState {
  isAuthenticated: boolean;
}

export const initialState: AuthContextState = {
  isAuthenticated: false
};

export interface AuthContextType extends AuthContextState {
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticateState] = useLocalStorage('isAuthenticated');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuthenticateState);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Check localStorage in useEffect to avoid SSR issues
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = async (credentials: any) => {
    const response = await authApi.authenticate(credentials);
    if (response.status === 200) {
      setIsAuthenticated(true);
    }
    return response.data;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Show loading state until we determine authentication status
  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
