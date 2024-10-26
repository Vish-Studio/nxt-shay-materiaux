'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Get the user object from the context
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // We redirect to the sign-in page if the user is not authenticated
      router.push('/sign-in');
    }
  }, [user, router]);

  // If not authenticated, render nothing or a loading indicator
  if (!user) return null;

  return <>{children}</>;
};

export default AuthGuard;
