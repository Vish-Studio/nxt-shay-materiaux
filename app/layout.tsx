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
  description: 'An inventory app for managing your clients and products.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs14', 'next14', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [
    { name: 'Seenarain Vishroy' },
    {
      name: 'Divesh Heeramun',
      url: 'https://www.linkedin.com/divesh.heeramun/'
    }
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' }
  ]
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
