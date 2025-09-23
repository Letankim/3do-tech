"use client"

import { Button } from "@/components/ui/button"
import { Menu, Phone, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="text-xl lg:text-2xl font-bold text-primary">
            <img onClick={()=> {
              router.push("/");
            }} className="w-[70px] h-[70px] object-cover object-center" src="/logo.png"/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#gioi-thieu"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Giới thiệu
            </a>
            <a href="#san-pham" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Sản phẩm
            </a>
            <a
              href="#san-pham-thuc-te"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Dự án thực tế
            </a>
            <a href="#doi-tac" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Đối tác
            </a>
            <a href="#lien-he" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Liên hệ
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button size="lg" className="font-medium flex align-center gap-2 p-2">
                <span>Liên hệ ngay</span>
                 <Phone size={18} />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#gioi-thieu"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Giới thiệu
              </a>
              <a
                href="#san-pham"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sản phẩm
              </a>
              <a
                href="#san-pham-thuc-te"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dự án thực tế
              </a>
              <a
                href="#doi-tac"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đối tác
              </a>
              <a
                href="#lien-he"
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </a>
              <div className="px-3 py-2">
                <Button size="sm" className="w-full font-medium">
                  Liên hệ ngay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
