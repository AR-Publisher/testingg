// app/layout.tsx (Server Component)
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import ClientSessionProvider from "./ClientSessionProvider" // Import the ClientSessionProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Patrovaa - Empowering Creators",
  description:
    "Monetize your content and grow your audience on Patrovaa.",
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