'use client';

import { AuthProvider } from '@/context/AuthContext';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <main className="auth-page">{children}</main>
      </AuthProvider>
    </>
  );
}
