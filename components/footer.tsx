"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"

export function Footer() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <footer className="bg-background border-t">
      {/* Main footer content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    <img
                      onClick={() => {
                        router.push("/")
                      }}
                      src="/logo.png"
                      alt="Logo footer"
                      className="w-[60px] h-[60px] object-contain"
                    />
                  </span>
                </div>
                <span className="text-2xl font-bold">{t("footer.company.name")}</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{t("footer.company.description")}</p>

              {/* Social links */}
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white bg-transparent">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t("footer.services.title")}</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.websiteDevelopment")}
                  </Link>
                </li>
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.mobileApps")}
                  </Link>
                </li>
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.systemIntegration")}
                  </Link>
                </li>
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.aiSolutions")}
                  </Link>
                </li>
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.cloudServices")}
                  </Link>
                </li>
                <li>
                  <Link href="#san-pham" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.services.networkSecurity")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t("footer.contact.title")}</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div>{t("footer.contact.address.line1")}</div>
                    <div>{t("footer.contact.address.line2")}</div>
                    <div>{t("footer.contact.address.line3")}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{t("footer.contact.phone")}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{t("footer.contact.email")}</span>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div>{t("footer.contact.hours.mondayToFriday")}</div>
                    <div>{t("footer.contact.hours.saturday")}</div>
                    <div>{t("footer.contact.hours.sunday")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-start items-start space-y-4 md:space-y-0">
            
            {/* Bên trái: bản quyền */}
            <div className="text-muted-foreground text-sm">
              {t("footer.bottom.copyright")}
            </div>

            {/* Bên phải: links + language + contact */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 text-sm">
              {/* Links */}
              <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-2 md:space-y-0">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.bottom.privacyPolicy")}
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.bottom.termsOfUse")}
                </Link>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.bottom.cookiePolicy")}
                </Link>
              </div>

              {/* Ngôn ngữ + Contact */}
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}