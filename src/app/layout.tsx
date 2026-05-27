import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nauka — Curated Cinematic Invitation Studio",
  description:
    "Undangan digital dengan rasa yang lebih hidup. Bukan sekadar undangan, sebuah pengalaman.",
  keywords: [
    "Nauka",
    "undangan digital",
    "cinematic invitation",
    "wedding invitation",
    "digital invitation",
  ],
  authors: [{ name: "Nauka Studio" }],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Nauka — Curated Cinematic Invitation Studio",
    description:
      "Undangan digital dengan rasa yang lebih hidup. Bukan sekadar undangan, sebuah pengalaman.",
    type: "website",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#F6F2EE] text-[#1C1C1C]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
