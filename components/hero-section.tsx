"use client"

import Link from "next/link"
import { ArrowRight, ArrowDownRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-ink text-ink-text">
      {/* Duong canh le kieu ban ve */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="wrap relative h-full">
          <div className="absolute inset-y-0 left-5 w-px bg-ink-line sm:left-8 xl:left-10" />
          <div className="absolute inset-y-0 right-5 w-px bg-ink-line sm:right-8 xl:right-10" />
        </div>
      </div>

      <div className="wrap relative pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/add-in-office" className="group inline-flex items-center gap-3 text-sm">
              <span className="tag bg-brand px-2 py-1 text-ink">Mới</span>
              <span className="text-ink-text/80 transition-colors group-hover:text-ink-text">
                {t("nav.addin")}: chuẩn hóa văn bản Word &amp; trang in Excel
              </span>
              <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <span className="tag hidden text-ink-muted md:inline">{t("contact.info.addressValue")}</span>
          </div>
        </Reveal>

        <h1 className="mega mt-12 text-[clamp(3.4rem,11.5vw,10.5rem)] sm:mt-16">
          <Reveal as="span" className="block">{t("hero.title")}</Reveal>
          <Reveal as="span" delay={90} className="block text-brand">{t("hero.subtitle")}</Reveal>
          <Reveal as="span" delay={180} className="block">
            {t("hero.titleSecondary")}
            <span className="text-brand">.</span>
          </Reveal>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-ink-line pt-8 lg:mt-16 lg:grid-cols-12">
          <Reveal delay={240} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-text/75">{t("hero.description")}</p>
          </Reveal>
          <Reveal delay={300} className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <a href="#lien-he" className="btn btn-brand">
              {t("hero.cta.primary")}
              <ArrowDownRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#san-pham-thuc-te" className="btn btn-ghost-dark">
              {t("hero.cta.secondary")}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
