'use client';

import { AuthGuard } from '@/components/authentication/auth-card/auth-guard';
import { AppDataProvider } from '@/context/AppDataContext';
import { AuthProvider } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AuthGuard>
        <UserProvider>
          <AppDataProvider>
            <main className="dashboard-page">{children}</main>
          </AppDataProvider>
        </UserProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
