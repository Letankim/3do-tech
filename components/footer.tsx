"use client"

import Link from "next/link"
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
    <footer className="relative overflow-hidden bg-ink text-ink-text">
      <div className="ruler text-ink-text" aria-hidden />
      <div className="wrap grid gap-12 pb-12 pt-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-muted">{t("footer.company.description")}</p>
          <div className="mt-8 flex gap-6 text-sm">
            <a href="https://www.facebook.com/profile.php?id=61581499790956" target="_blank" rel="noopener noreferrer" className="link-u">
              Facebook ↗
            </a>
            <a href="https://www.youtube.com/@3DO-Corp" target="_blank" rel="noopener noreferrer" className="link-u">
              YouTube ↗
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="tag text-ink-muted">{t("footer.services.title")}</h4>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {services.map((k) => (
              <li key={k}>
                <Link href="/#dich-vu" className="link-u text-ink-text/85 hover:text-ink-text">
                  {t(k)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/add-in-office" className="inline-flex items-center gap-2 font-semibold text-brand">
                Add-in Office (Word &amp; Excel)
                <span className="tag border border-brand px-1.5 py-px text-[10px]">Mới</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="tag text-ink-muted">{t("footer.contact.title")}</h4>
          <address className="mt-5 space-y-4 text-[15px] not-italic text-ink-text/85">
            <p>
              {t("footer.contact.address.line1")}, {t("footer.contact.address.line2")}
              <br />
              {t("footer.contact.address.line3")}
            </p>
            <p className="space-y-1">
              <a href="tel:0774889191" className="flex items-baseline justify-between gap-4 border-b border-ink-line pb-1 hover:text-ink-text">
                <span className="font-mono">0774.88.9191</span>
                <span className="text-sm text-ink-muted">Mr. Cường · Kỹ thuật</span>
              </a>
              <a href="tel:0865341745" className="flex items-baseline justify-between gap-4 border-b border-ink-line pb-1 hover:text-ink-text">
                <span className="font-mono">0865.341.745</span>
                <span className="text-sm text-ink-muted">Mr. Kim · Tư vấn</span>
              </a>
            </p>
            <a href={`mailto:${t("footer.contact.email")}`} className="link-u block font-mono">
              {t("footer.contact.email")}
            </a>
            <p className="text-sm text-ink-muted">
              {t("footer.contact.hours.mondayToFriday")}
              <br />
              {t("footer.contact.hours.saturday")} · {t("footer.contact.hours.sunday")}
            </p>
          </address>
        </div>
      </div>

      <div className="wrap" aria-hidden>
        <div className="select-none whitespace-nowrap text-[clamp(4rem,17.5vw,15.5rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink-text/[0.07]">
          3DO.TECH
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="wrap flex flex-col gap-4 py-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>{t("footer.bottom.copyright")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="#" className="hover:text-ink-text">{t("footer.bottom.privacyPolicy")}</Link>
            <Link href="#" className="hover:text-ink-text">{t("footer.bottom.termsOfUse")}</Link>
            <Link href="#" className="hover:text-ink-text">{t("footer.bottom.cookiePolicy")}</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
