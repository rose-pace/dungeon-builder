import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Dungeon Builder',
  description: 'Tools to help DMs with their campaigns',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-full antialiased prose prose-dungeon dark:prose-invert`}
      >
        <header className="prose-xl sticky top-0 z-40">
          <div className="max-w-8xl mx-auto p-4 sm:px-6 md:px-8 flex gap-4 leading-9">
            <div className="font-semibold">
              {String(metadata.title)}
            </div>
            <div className="monospace grow text-center">TODO: Add navigation here</div>
          </div>
        </header>
        <main className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          {children}
        </main>
        <footer>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-4">
            <span className="monospace">TODO: Add footer here</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
