import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SWS',
  description: 'Smart World Systems. Get ready for innovative solutions that transform your digital presence.',
  keywords: 'web development, nuit de l`\'info, technology, coming soon, launch',
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
    title: 'SWS',
    description: 'Smart World Systems. Get ready for innovative solutions that transform your digital presence.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SWS',
    description: 'Smart World Systems. Get ready for innovative solutions that transform your digital presence.',
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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href={inter.href} />
        <script async defer src="https://cloud.umami.is/script.js" data-website-id="4bb4c7ac-3a58-49f4-8aaf-1a12a2c9cf84"></script>
      </head>        
      <body className={inter.className}>{children}</body>
    </html>
  );
}