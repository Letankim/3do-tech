"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Download, Menu, X, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"

const NAV = [
  { href: "/#gioi-thieu", key: "nav.about" },
  { href: "/#dich-vu", key: "nav.services" },
  { href: "/#san-pham-thuc-te", key: "nav.projects" },
  { href: "/#doi-tac", key: "nav.products" },
  { href: "/#lien-he", key: "nav.contact" },
] as const

export function StickyHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Danh dau muc dang xem: o trang chu theo khoi dang cuon toi, o trang /projects la "Du an"
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname?.startsWith("/projects") ? "san-pham-thuc-te" : null)
      return
    }
    const ids = NAV.map((n) => n.href.split("#")[1])
    const pick = () => {
      const line = 96 // ngay duoi thanh header
      // khoi nao da qua mep header va gan mep nhat thi la khoi dang xem (khong phu thuoc thu tu tren trang)
      let cur: string | null = null
      let best = -Infinity
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= line && top > best) {
          best = top
          cur = id
        }
      }
      // cuon het trang thi chon Lien he (khoi cuoi trang)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = "lien-he"
      setActive(cur)
    }
    pick()
    window.addEventListener("scroll", pick, { passive: true })
    window.addEventListener("resize", pick)
    return () => {
      window.removeEventListener("scroll", pick)
      window.removeEventListener("resize", pick)
    }
  }, [pathname])
  const isOn = (href: string) => active !== null && href.endsWith(`#${active}`)

  const onAddin = pathname?.startsWith("/add-in-office")

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-200 ${
        scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="3DO TECH - trang chủ">
          <img src="/android-chrome-192x192.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
          <span className="text-[17px] font-extrabold tracking-tight">
            3DO<span className="text-primary"> TECH</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {NAV.map((n) => {
            const on = isOn(n.href)
            return (
              <Link
                key={n.key}
                href={n.href}
                aria-current={on ? "location" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  on ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(n.key)}
              </Link>
            )
          })}
          <Link
            href="/add-in-office"
            aria-current={onAddin ? "page" : undefined}
            className={`ml-1 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              onAddin
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/25 bg-accent text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            {t("nav.addin")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href="https://zalo.me/0865341745"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90"
          >
            {t("nav.contact")}
            <Phone className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Đóng menu" : "Mở menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={isOn(n.href) ? "location" : undefined}
                className={`rounded-lg px-3 py-3 text-base font-medium ${isOn(n.href) ? "bg-accent text-primary" : "hover:bg-muted"}`}
              >
                {t(n.key)}
              </Link>
            ))}
            <Link
              href="/add-in-office"
              className="mt-1 flex items-center justify-between rounded-lg bg-accent px-3 py-3 text-base font-semibold text-primary"
            >
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" aria-hidden />
                {t("nav.addin")}
              </span>
            </Link>
            <div className="flex items-center justify-between gap-3 pt-3">
              <LanguageSwitcher />
              <a
                href="https://zalo.me/0865341745"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-ink-foreground"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
