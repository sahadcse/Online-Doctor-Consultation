import type { Metadata } from "next";
import { DM_Sans, Work_Sans } from '@next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: "--font-dm-sans",
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Online Doctor Consultation",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${workSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
