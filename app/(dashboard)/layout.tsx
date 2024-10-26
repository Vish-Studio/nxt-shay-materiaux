'use client';

import AuthGuard from '@/components/authentication/auth-card/auth-guard';
import { AuthProvider } from '@/context/AuthContext';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <AuthGuard>
          /<main className="dashboard-page">{children}</main>;
        </AuthGuard>
      </AuthProvider>
    </>
  );
}
