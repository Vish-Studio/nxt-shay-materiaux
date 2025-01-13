import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import localFont from 'next/font/local';

import '../styles/global-icons.scss';
import '../styles/global.scss';

const materialSymbols = localFont({
  variable: '--font-family-symbols', // Variable name (to reference after in CSS/styles)
  style: 'normal',
  src: '../node_modules/material-symbols/material-symbols-rounded.woff2', // This is a reference to woff2 file from NPM package "material-symbols"
  display: 'block',
  weight: '100 700'
});

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist'
});

export const metadata: Metadata = {
  title: 'SME Inventory app',
  description: 'An inventory app for managing your clients and products.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${materialSymbols.variable}`}
    >
      <body className={`${urbanist.className} ${urbanist.variable}`}>{children}</body>
    </html>
  );
}
