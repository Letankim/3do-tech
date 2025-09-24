"use client"

import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const router = useRouter()
  const { t } = useLanguage()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 100)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {

        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with padding */}
          <div className="text-xl lg:text-2xl font-bold text-primary px-3 sm:px-4">
            <img
              onClick={() => {
                router.push("/")
              }}
              className="w-[50px] h-[50px] object-cover object-center"
              src="/android-chrome-192x192.png"
              alt="Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#gioi-thieu"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#san-pham"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.services")}
            </a>
            <a
              href="#san-pham-thuc-te"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#doi-tac"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.products")}
            </a>
            <a
              href="#lien-he"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
          </nav>

          {/* Desktop CTA and Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4 pr-4">
            <LanguageSwitcher />
            <a
              href="https://zalo.me/0865341745"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="font-medium flex items-center gap-2 p-2 relative overflow-hidden group"
              >
                <span>{t("nav.contact")}</span>
                <Phone size={18} />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-500 ease-out"></span>
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors pr-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h12M4 18h8"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation with Enhanced Animation */}
        <div
          className={`lg:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100 translate-y-0 scale-100"
              : "max-h-0 opacity-0 translate-y-[-10%] scale-95"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#gioi-thieu"
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </a>
            <a
              href="#san-pham"
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.services")}
            </a>
            <a
              href="#san-pham-thuc-te"
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.projects")}
            </a>
            <a
              href="#doi-tac"
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.products")}
            </a>
            <a
              href="#lien-he"
              className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </a>
            <div className="px-3 py-2 space-y-2">
              <LanguageSwitcher />
              <Button size="sm" className="w-full font-medium">
                {t("nav.contact")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}