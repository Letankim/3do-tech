"use client"

import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"

export function CompanyIntro() {
  const { t } = useLanguage()
  const items = [
    { k: "M", title: t("company.mission.title"), text: t("company.mission.description") },
    { k: "V", title: t("company.vision.title"), text: t("company.vision.description") },
    { k: "C", title: t("company.coreValues.title"), text: t("company.coreValues.description") },
  ]

  return (
    <section id="gioi-thieu" className="sec bg-paper">
      <div className="wrap">
        <SectionHead index="01" label={t("nav.about")} note="3DO.TECH / VN" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 className="title whitespace-nowrap">
              {t("company.intro.title")}
              <br />
              <span className="text-brand-deep">{t("company.intro.subtitle")}</span>
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <p className="text-[clamp(1.35rem,2.5vw,2.1rem)] font-medium leading-[1.35] tracking-[-0.02em]">
              {t("company.intro.description")}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-l border-t border-line md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 90} className="group relative border-b border-r border-line bg-paper-3 p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <span className="tag text-muted-foreground">0{i + 1}</span>
                <span className="font-mono text-5xl font-semibold leading-none text-line transition-colors group-hover:text-brand" aria-hidden>
                  {it.k}
                </span>
              </div>
              <h3 className="mt-10 text-2xl font-bold tracking-tight">{it.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
