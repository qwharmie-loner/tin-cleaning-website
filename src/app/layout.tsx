import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIN GROUP SERVICES - Professional Cleaning Services",
  description: "TIN GROUP SERVICE — Clean Spaces, Happy Clients! Professional cleaning for hotels, offices, apartments, industrial facilities, and commercial dishwashing.",
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'TIN GROUP SERVICES - Professional Cleaning Services',
    description:
      'Clean Spaces, Happy Clients! Professional cleaning for hotels, offices, apartments, industrial facilities, and commercial dishwashing.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
