import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import '../styles/global-icons.scss';
import '../styles/global.scss';
import Head from 'next/head';

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

      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </Head>
      
      <body className={`${urbanist.className} ${urbanist.variable}`}>
        {children}
      </body>
    </html>
  );
}
