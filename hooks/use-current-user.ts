import { IUser } from '@/types/api/user';
import { useEffect, useState } from 'react';

export const useCurrentUser = (): { currentUser: IUser | null; loading: boolean } => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return { currentUser, loading };
};
