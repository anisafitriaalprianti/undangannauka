import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import '../../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Arka & Dyana — Wedding Invitation',
  description:
    'Undangan pernikahan Arka & Dyana. Kenangan yang perlahan hidup.',
  keywords: ['undangan', 'pernikahan', 'wedding', 'invitation', 'nauka'],
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Arka & Dyana — Wedding Invitation',
    description:
      'Undangan pernikahan Arka & Dyana. Kenangan yang perlahan hidup.',
    type: 'website',
    images: ['/og-image.svg'],
  },
};

export default function Premium1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      {children}
    </div>
  );
}
