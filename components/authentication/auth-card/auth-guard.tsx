'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // We redirect to sign in page if user is not authenticated
      router.push('/sign-in');
    }
  }, [isAuthenticated, router]);

  // If not authenticated, render nothing or a loading indicator
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthGuard;
