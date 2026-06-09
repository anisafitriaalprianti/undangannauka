import { ModeProvider } from "@/lib/mode";
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
    icon: "/logo.webp",
  },
  openGraph: {
    title: "Nauka — Curated Cinematic Invitation Studio",
    description:
      "Undangan digital dengan rasa yang lebih hidup. Bukan sekadar undangan, sebuah pengalaman.",
    type: "website",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}