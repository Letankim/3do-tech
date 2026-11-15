"use client"

import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function CTASection() {
  const { t } = useLanguage()

  const trust = [
    { k: "dataSecurity" },
    { k: "quickResponse" },
    { k: "support" },
    { k: "warranty" },
  ] as const

  return (
    <section className="section-y border-t border-border">
      <div className="container-x">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{t("cta.badge")}</p>
            <h2 className="display mt-5 !text-[clamp(2.1rem,4.8vw,3.5rem)]">
              {t("cta.title")} <span className="text-primary">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="lead mt-6 max-w-xl">{t("cta.description")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#lien-he" className="inline-flex h-12 items-center gap-2 rounded bg-ink px-6 text-[15px] font-semibold text-ink-foreground transition-opacity hover:opacity-90">
                {t("cta.buttons.startProject")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold underline decoration-border decoration-2 underline-offset-[6px] hover:decoration-primary">
                {t("cta.buttons.freeConsultation")}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted-foreground">
              <a href="tel:0865341745" className="inline-flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4" aria-hidden /> {t("cta.contact.phone")}</a>
              <a href="mailto:3do.service@gmail.com" className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="h-4 w-4" aria-hidden /> {t("cta.contact.email")}</a>
              <a href="https://zalo.me/0865341745" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4" aria-hidden /> {t("cta.contact.chat")}</a>
            </div>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-8 border-t border-foreground pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((x) => (
            <li key={x.k}>
              <div className="font-serif text-lg font-semibold">{t(`cta.trustElements.${x.k}.title`)}</div>
              <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`cta.trustElements.${x.k}.description`)}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
