"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function CTASection() {
  const { t } = useLanguage()
  const trust = ["quickResponse", "dataSecurity", "warranty", "support"] as const

  return (
    <section className="relative overflow-hidden bg-brand text-ink">
      <div className="ruler text-ink" aria-hidden />
      <div className="wrap py-[clamp(4.5rem,9vw,8rem)]">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="tag">[ {t("cta.badge")} ]</span>
            <span className="h-px flex-1 bg-ink/25" aria-hidden />
            <span className="tag hidden sm:inline">{t("cta.trustElements.tagline")}</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mega mt-10 max-w-5xl text-[clamp(2.6rem,7.5vw,6.5rem)]">
            {t("cta.title")} <span className="underline decoration-[0.08em] underline-offset-[0.12em]">{t("cta.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink/80">{t("cta.description")}</p>
          </Reveal>
          <Reveal delay={160} className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap gap-3">
              <a href="#lien-he" className="btn btn-ink">
                {t("cta.buttons.startProject")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="btn border border-ink hover:bg-ink hover:text-brand">
                {t("cta.buttons.freeConsultation")}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
              <a href="tel:0865341745" className="link-u">{t("cta.contact.phone")}</a>
              <a href={`mailto:${t("cta.contact.email")}`} className="link-u">{t("cta.contact.email")}</a>
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="link-u">{t("cta.contact.chat")} ↗</a>
            </div>
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
          {trust.map((k, i) => (
            <div key={k} className={`pt-6 ${i % 2 ? "pl-5" : "pr-5"} lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-ink/25" : ""} ${i < 2 ? "pb-6 lg:pb-0" : ""}`}>
              <dd className="text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{t(`cta.trustElements.${k}.title`)}</dd>
              <dt className="tag mt-2 text-ink/70">{t(`cta.trustElements.${k}.description`)}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
