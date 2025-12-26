import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EasyMart | Premium Shopping",
  description: "The best place to shop online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <main style={{ paddingTop: '4rem', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
