"use client"

import { ArrowRight, Phone, Mail, MessageCircle, Shield, Clock, Users, BadgeCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function CTASection() {
  const { t } = useLanguage()

  const trust = [
    { icon: Shield, k: "dataSecurity" },
    { icon: Clock, k: "quickResponse" },
    { icon: Users, k: "support" },
    { icon: BadgeCheck, k: "warranty" },
  ] as const

  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
          <div className="grid-paper pointer-events-none absolute inset-0 opacity-20 [filter:invert(1)]" aria-hidden />
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {t("cta.badge")}
            </span>
            <h2 className="display mt-5 !text-[clamp(2rem,4.4vw,3.25rem)]">
              {t("cta.title")} <span className="text-white/70">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{t("cta.description")}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lien-he"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-primary transition-opacity hover:opacity-90"
              >
                {t("cta.buttons.startProject")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://zalo.me/0865341745"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/35 px-6 font-semibold transition-colors hover:bg-white/10"
              >
                {t("cta.buttons.freeConsultation")}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              <a href="tel:0865341745" className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" aria-hidden /> {t("cta.contact.phone")}
              </a>
              <a href="mailto:3do.service@gmail.com" className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" aria-hidden /> {t("cta.contact.email")}
              </a>
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="h-4 w-4" aria-hidden /> {t("cta.contact.chat")}
              </a>
            </div>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((x) => (
            <li key={x.k} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <x.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <div className="font-semibold">{t(`cta.trustElements.${x.k}.title`)}</div>
                <div className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{t(`cta.trustElements.${x.k}.description`)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
