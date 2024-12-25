import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
// setup fontawesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
// fonts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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
        <header className="prose-xl sticky top-0 z-40 bg-gradient-to-t from-slate-700 dark:from-sky-500 from-10% via-cyan-800 dark:via-indigo-600 via-30% to-slate-400 dark:to-slate-700 to-90% shadow-lg shadow-zinc-800/50 dark:shadow-sky-400/50 prose-a:no-underline prose-a:text-white">
          <div className="mx-auto p-4 sm:px-6 md:px-8 flex gap-4 leading-9">
            <div className="font-semibold">
              <Link href="/">
                <FontAwesomeIcon icon={faHouse} className="mr-2 fa-fw" />
                Dungeon Builder
              </Link>
            </div>
            <nav className="prose-ul:m-0 prose-li:m-0">
              <ul className="flex list-none space-x-4">
                <li>
                  <Link href="/dungeons" className="hover:underline">
                    Dungeons
                  </Link>
                </li>
                <li>
                  <a href="/stat-blocks" className="hover:underline">
                    Stat Blocks
                  </a>
                </li>
                <li>
                  <a href="/magic-items" className="hover:underline">
                    Magic Items
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="hover:prose-a:text-sky-500 max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="bg-white dark:bg-slate-600 py-8 px-4 sm:px-8 md:px-10">
            {children}
          </div>
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
