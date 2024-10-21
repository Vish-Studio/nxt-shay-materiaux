import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import '../styles/global-icons.scss';
import '../styles/global.scss';

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist'
});

export const metadata: Metadata = {
  title: 'Shay - Inventory app',
  description: 'An inventory app for managing clients and products.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} ${urbanist.variable}`}>{children}</body>
    </html>
  );
}
