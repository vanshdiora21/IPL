import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IPL Fantasy League 2025',
  description: 'Live fantasy leaderboard · CREX points',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
