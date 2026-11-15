import type React from "react"
import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FloatingContactWidget } from "@/components/floating-contact-widget"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"
import { Toaster } from "@/components/ui/toaster"

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
})
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
})

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
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#0d0f12",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Danh dau trinh duyet co JS de bat hieu ung hien dan; khong JS thi noi dung van hien du */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Bỏ qua, tới nội dung chính
        </a>
        <LanguageProvider>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-ink">
                <div className="h-10 w-10 animate-spin border-2 border-brand border-t-transparent" />
              </div>
            }
          >
            <div id="noi-dung">{children}</div>
          </Suspense>
          <FloatingContactWidget />
        </LanguageProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
