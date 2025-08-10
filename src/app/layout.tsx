import { ThemeProvider } from '@/components/theme-provider';
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
  title: "Terrapedia - Your Guide to the World's Countries",
  description:
    'Terrapedia is your global knowledge hub for countries, maps, and facts. Explore detailed profiles, geography, and travel insights from around the world.',
  keywords: [
    'Terrapedia',
    'world countries information',
    'global facts',
    'country profiles',
    'geography',
    'world map',
    'travel guide',
    'nations data',
  ],
  authors: [{ name: 'Jobie Ramos', url: 'https://jobie.dev' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Terrapedia - Your Guide to the World's Countries",
    description: 'Discover countries, cultures, and facts from around the globe with Terrapedia.',
    url: 'https://terrapedia.vercel.app',
    siteName: 'Terrapedia',
    images: [
      {
        url: 'https://terrapedia.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Terrapedia - Explore the World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
