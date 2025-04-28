// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import ClientSessionProvider from "./ClientSessionProvider"; // ✅ Session provider
import { Toaster } from "sonner"; // ✅ Import Toaster for notifications

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patrovaa - Empowering Creators",
  description: "Monetize your content and grow your audience on Patrovaa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          {children}
          <Toaster richColors position="top-center" /> {/* ✅ Added Toaster inside ClientSessionProvider */}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
