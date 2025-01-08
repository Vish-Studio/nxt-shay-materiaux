'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { appRoutes } from '@/constants/routes/app-routes';
import { useAuth } from '@/context/AuthContext';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user && mounted) {
      // We redirect to the sign-in page if the user is not authenticated
      router.push(appRoutes.signIn.index);
    }
  }, [user, router, mounted]);

  if (!mounted || !user) return null;

  return <>{children}</>;
};
