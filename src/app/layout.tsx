import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

const plusJakarta = Plus_Jakarta_Sans({
  display: 'swap',
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TripSync',
  description: 'Plan smarter trips with shared itineraries, tasks, and budgets.',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={plusJakarta.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
