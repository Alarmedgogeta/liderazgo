import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import UnregisterServiceWorker from '@/components/UnregisterServiceWorker';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Olist — Presentación Ejecutiva Interactiva',
  description:
    'Análisis del e-commerce brasileño Olist: ventas, logística y experiencia del cliente.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <UnregisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
