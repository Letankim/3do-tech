"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, Smartphone, Globe, Database, Shield, Cpu, Cloud } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  const { t } = useLanguage()

  const tiles = [
    { icon: Globe, label: t("products.web.title"), span: "col-span-2" },
    { icon: Smartphone, label: t("products.mobile.title"), span: "" },
    { icon: Cpu, label: t("products.ai.title"), span: "" },
    { icon: Database, label: t("products.management.title"), span: "" },
    { icon: Cloud, label: t("products.cloud.title"), span: "" },
    { icon: Shield, label: t("products.security.title"), span: "col-span-3" },
  ]

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <Reveal>
            <Link
              href="/add-in-office"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-sm text-muted-foreground transition-colors hover:border-primary/40"
            >
              <span className="rounded-full bg-signal px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-signal-foreground">Mới</span>
              <span>Add-in chuẩn hóa văn bản Word &amp; Excel</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-6">
              {t("hero.title")} <span className="text-primary">{t("hero.subtitle")}</span>{" "}
              {t("hero.titleSecondary")}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lead mt-6 max-w-xl">{t("hero.description")}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lien-he"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#san-pham-thuc-te"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-base font-semibold transition-colors hover:border-primary/50"
              >
                {t("hero.cta.secondary")}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hidden lg:block">
          <div className="surface relative p-3 shadow-[0_30px_60px_-40px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
            <div className="flex items-center gap-1.5 px-2 pb-3 pt-1" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {tiles.map((x, i) => (
                <div
                  key={i}
                  className={`${x.span} flex min-h-[7.5rem] flex-col justify-between rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40`}
                >
                  <x.icon className="h-6 w-6 text-primary" aria-hidden />
                  <span className="text-sm font-semibold leading-snug">{x.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
