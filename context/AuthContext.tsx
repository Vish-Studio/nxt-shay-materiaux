import { useLocalStorage } from '@/hooks/use-local-storage';
import { authApi } from '@/services/api/auth';
import type { IApiResponse } from '@/types/api/base';
import type { IUser } from '@/types/api/user';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export interface AuthContextState {
  user: IUser | null;
}

export const initialState: AuthContextState = {
  user: null
};

export interface AuthContextType extends AuthContextState {
  login: (credentials: any) => Promise<IApiResponse<IUser>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () =>
    Promise.resolve({
      status: 'error',
      message: 'Not implemented',
      statusCode: 501
    }),
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

    if (response.status == 'success') {
      setUser(response.data ?? null);
    }

    return response;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  // Show loading state until we determine authentication status
  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
