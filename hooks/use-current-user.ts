import { useAuth } from '@/context/AuthContext';
import { IUser } from '@/types/api/user';

export const useCurrentUser = (): { currentUser: IUser | null; loading: boolean } => {
  const { user } = useAuth();

  return {
    currentUser: user,
    loading: false // Auth loading is handled at AuthContext level
  };
};
