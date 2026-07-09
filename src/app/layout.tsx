import type { Metadata } from 'next';
import { DM_Sans, Geist, Geist_Mono, Lato, Merriweather, Poppins } from 'next/font/google';
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

const merriweather = Merriweather({
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['400', '700'],
  variable: '--font-lato',
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
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${dmSans.variable} ${poppins.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <UnregisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
