"use client"

import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function CompanyIntro() {
  const { t } = useLanguage()
  const items = [
    { title: t("company.mission.title"), text: t("company.mission.description") },
    { title: t("company.vision.title"), text: t("company.vision.description") },
    { title: t("company.coreValues.title"), text: t("company.coreValues.description") },
  ]

  return (
    <section id="gioi-thieu" className="section-y border-t border-border">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3"><b>01</b>{t("nav.about")}</p>
          <div className="lg:col-span-9">
            <h2 className="h2 max-w-3xl">
              {t("company.intro.title")} <span className="text-primary">{t("company.intro.subtitle")}</span>
            </h2>
            <p className="lead mt-6 max-w-2xl">{t("company.intro.description")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-foreground pt-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <h3 className="font-serif text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
