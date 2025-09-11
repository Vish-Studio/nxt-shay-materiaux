import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';

import { useCurrentUser } from '@/hooks/use-current-user';
import { authApi } from '@/services/api/auth';
import { IUser } from '@/types/api/user';

export interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
  initialUser?: IUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUser = null }) => {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (user || !currentUser) return;

    setLoading(true);
    try {
      const apiBody = { id: currentUser._id };
      const response = await authApi.me(apiBody);
      setUser(response.data ?? null);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
    }
  }, [user, currentUser]);

  useEffect(() => {
    if (currentUser && !user) {
      fetchUser();
    }
  }, [currentUser, user, fetchUser]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      fetchUser
    }),
    [user, loading, error, fetchUser]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
