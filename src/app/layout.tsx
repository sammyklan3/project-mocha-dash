import React from "react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./styles/globals.css";
import AuthProvider from "@/context/AuthContext";
import { Metadata } from "next";
import "./styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Mocha",
  description: "Welcome to Mocha",
  keywords: ["nextjs", "seo", "app"],
  // openGraph: {
  //   title: "Project Mocha",
  //   description: "Welcome to Mocha",
  //   type: "website",
  //   url: "http://localhost:3000",
  //   images: [
  //     {
  //       url: "https://localhost:3000/next.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "My App Preview",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
