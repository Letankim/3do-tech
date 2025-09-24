import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FloatingContactWidget } from "@/components/floating-contact-widget"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "3DO TECH - Công nghệ chuyển đổi số",
  description: "Giải pháp công nghệ tiên tiến cho doanh nghiệp hiện đại",
  generator: "3dotech",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Suspense  fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                  </div>
                }>{children}</Suspense>
          <FloatingContactWidget />
        </LanguageProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
