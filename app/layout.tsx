import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FloatingContactWidget } from "@/components/floating-contact-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "3DO TECH - Công ty Công nghệ Hàng đầu",
  description: "Giải pháp công nghệ tiên tiến cho doanh nghiệp hiện đại",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <FloatingContactWidget />
        <Analytics />
      </body>
    </html>
  )
}
