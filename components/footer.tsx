"use client"

import Link from "next/link"
import { Facebook, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"

export function Footer() {
  const { t } = useLanguage()
  const services = [
    "footer.services.websiteDevelopment",
    "footer.services.mobileApps",
    "footer.services.systemIntegration",
    "footer.services.aiSolutions",
    "footer.services.cloudServices",
    "footer.services.networkSecurity",
  ] as const

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <img src="/android-chrome-192x192.png" alt="" width={40} height={40} className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-extrabold tracking-tight">{t("footer.company.name")}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/70">{t("footer.company.description")}</p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=61581499790956"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 transition-colors hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@3DO-Corp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 transition-colors hover:bg-white/10"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground/55">{t("footer.services.title")}</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((k) => (
              <li key={k}>
                <Link href="/#dich-vu" className="text-ink-foreground/80 transition-colors hover:text-white">
                  {t(k)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/add-in-office" className="inline-flex items-center gap-2 font-semibold text-white">
                Add-in Office (Word &amp; Excel)
                <span className="rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold uppercase text-signal-foreground">Mới</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground/55">{t("footer.contact.title")}</h4>
          <ul className="mt-5 space-y-4 text-sm text-ink-foreground/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-foreground/50" aria-hidden />
              <div>
                <div>{t("footer.contact.address.line1")}</div>
                <div>{t("footer.contact.address.line2")}</div>
                <div>{t("footer.contact.address.line3")}</div>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink-foreground/50" aria-hidden />
              <div className="space-y-1">
                <a href="tel:0774889191" className="block hover:text-white">
                  <strong className="font-semibold text-white">0774.88.9191</strong> <span className="text-ink-foreground/55">Mr. Cường · Kỹ thuật</span>
                </a>
                <a href="tel:0865341745" className="block hover:text-white">
                  <strong className="font-semibold text-white">0865.341.745</strong> <span className="text-ink-foreground/55">Mr. Kim · Tư vấn</span>
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink-foreground/50" aria-hidden />
              <span>{t("footer.contact.email")}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ink-foreground/50" aria-hidden />
              <div>
                <div>{t("footer.contact.hours.mondayToFriday")}</div>
                <div>{t("footer.contact.hours.saturday")}</div>
                <div>{t("footer.contact.hours.sunday")}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-ink-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.bottom.copyright")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="#" className="hover:text-white">{t("footer.bottom.privacyPolicy")}</Link>
            <Link href="#" className="hover:text-white">{t("footer.bottom.termsOfUse")}</Link>
            <Link href="#" className="hover:text-white">{t("footer.bottom.cookiePolicy")}</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
