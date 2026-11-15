"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const onAddin = pathname?.startsWith("/add-in-office")

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ink-text transition-colors duration-300 ${
        scrolled || open ? "border-b border-ink-line bg-ink/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="3DO TECH, về trang chủ">
          <img src="/android-chrome-192x192.png" alt="" width={34} height={34} className="h-[34px] w-[34px] ring-1 ring-ink-line" />
          <span className="text-[15px] font-extrabold tracking-tight">
            3DO<span className="text-brand">.</span>TECH
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} className="px-3.5 py-2 text-[14px] text-ink-text/70 transition-colors hover:text-ink-text">
              {t(n.key)}
            </Link>
          ))}
          <Link
            href="/add-in-office"
            aria-current={onAddin ? "page" : undefined}
            className={`ml-2 inline-flex items-center gap-2 border px-3.5 py-1.5 text-[14px] font-semibold transition-colors ${
              onAddin ? "border-brand text-brand" : "border-ink-line hover:border-brand hover:text-brand"
            }`}
          >
            <span className="blink h-1.5 w-1.5 bg-brand" aria-hidden />
            {t("nav.addin")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="btn btn-brand !h-9 !px-4 !text-[14px]">
            {t("nav.contact")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-di-dong"
          className="tag -mr-1 flex h-10 items-center gap-2 px-2 lg:hidden"
        >
          {open ? "Đóng" : "Menu"}
          <span className="relative block h-3 w-5" aria-hidden>
            <span className={`absolute left-0 h-px w-5 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-5 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <div id="menu-di-dong" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-line bg-ink lg:hidden">
          <nav className="wrap flex flex-col py-6" aria-label="Điều hướng di động">
            {NAV.map((n, i) => (
              <Link key={n.key} href={n.href} className="flex items-baseline gap-4 border-b border-ink-line py-4 text-3xl font-bold tracking-tight">
                <span className="tag text-ink-muted">0{i + 1}</span>
                {t(n.key)}
              </Link>
            ))}
            <Link href="/add-in-office" className="flex items-baseline gap-4 border-b border-ink-line py-4 text-3xl font-bold tracking-tight text-brand">
              <span className="tag text-ink-muted">06</span>
              {t("nav.addin")}
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <LanguageSwitcher />
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="btn btn-brand flex-1">
                {t("nav.contact")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
