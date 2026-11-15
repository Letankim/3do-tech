"use client"

import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"

const partners = [
  { name: "Dotesco", logo: "/dotesco.png" },
  { name: "FPT Telecom", logo: "/fpttelecom.png" },
  { name: "HMS", logo: "/hms.png" },
  { name: "3DO Court", logo: "/meta-logo-abstract.png" },
  { name: "LAC.ID.VN", logo: "/lac.jpg" },
  { name: "Letankim.ID.VN", logo: "/letankim.jpg" },
]

export function PartnersSection() {
  const { t } = useLanguage()

  return (
    <section id="doi-tac" className="sec bg-paper">
      <div className="wrap">
        <SectionHead index="04" label={t("nav.products")} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="title">
              {t("partners.title")}
              <span className="text-brand-deep">{t("partners.subtitle")}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("partners.description")}</p>
            <p className="mt-8 border-t border-line pt-5 text-muted-foreground">
              {t("partners.additional")}
              <strong className="font-mono text-foreground">{t("partners.additionalHighlight")}</strong>
              {t("partners.additionalmore")}
            </p>
          </Reveal>

          <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:col-span-8">
            {partners.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 60}
                className="group relative flex aspect-[4/3] flex-col items-center justify-center border-b border-r border-line bg-paper-3 p-6"
              >
                <img
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  className="max-h-14 max-w-[70%] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <span className="tag absolute bottom-3 left-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">{p.name}</span>
                <span className="tag absolute right-3 top-3 text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
