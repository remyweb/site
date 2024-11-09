import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Terminal Systems - Coming Soon',
  description: 'Terminal Systems is launching soon. Get ready for innovative solutions that transform your digital presence.',
  keywords: 'web development, terminal systems, technology, coming soon, launch',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Terminal Systems - Coming Soon',
    description: 'Terminal Systems is launching soon. Get ready for innovative solutions that transform your digital presence.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal Systems - Coming Soon',
    description: 'Terminal Systems is launching soon. Get ready for innovative solutions that transform your digital presence.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}