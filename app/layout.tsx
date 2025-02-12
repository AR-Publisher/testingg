// app/layout.tsx (Server Component)
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import ClientSessionProvider from "./ClientSessionProvider" // Import the ClientSessionProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CreatorSpace - Support Creators You Love",
  description:
    "Join millions of creators monetizing their passion and building meaningful connections with their supporters.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>{children}</ClientSessionProvider> {/* Wrap children with ClientSessionProvider */}
      </body>
    </html>
  )
}



import './globals.css'