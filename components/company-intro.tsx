"use client"

import { Target, Eye, Lightbulb } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function CompanyIntro() {
  const { t } = useLanguage()
  const items = [
    { icon: Target, title: t("company.mission.title"), text: t("company.mission.description") },
    { icon: Eye, title: t("company.vision.title"), text: t("company.vision.description") },
    { icon: Lightbulb, title: t("company.coreValues.title"), text: t("company.coreValues.description") },
  ]

  return (
    <section id="gioi-thieu" className="section-y border-y border-border bg-card">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t("nav.about")}</span>
            <h2 className="h2 mt-4">
              {t("company.intro.title")} <span className="text-primary">{t("company.intro.subtitle")}</span>
            </h2>
            <p className="lead mt-5">{t("company.intro.description")}</p>
          </Reveal>

          <div className="divide-y divide-border rounded-2xl border border-border bg-background">
            {items.map((it, i) => (
              <Reveal key={i} delay={i * 80} className="flex gap-5 p-6 sm:p-7">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <it.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
