"use client"

import { useState } from "react"
import { ArrowRight, Smartphone, Globe, Database, Shield, Cpu, Cloud } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"

interface Product {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  image: string
}

export function ProductsSection() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)

  const products: Product[] = [
    {
      icon: Smartphone,
      title: t("products.mobile.title"),
      description: t("products.mobile.description"),
        features: ["React Native", "Flutter", "Native iOS/Android"],
      image: "/mobile-app-development.png",
    },
    {
      icon: Globe,
      title: t("products.web.title"),
      description: t("products.web.description"),
     features: ["Next.js", "React", "Vue.js"],
      image: "/modern-website-design.png",
    },
    {
      icon: Database,
      title: t("products.management.title"),
      description: t("products.management.description"),
     features: ["ERP", "CRM", "Inventory Management"],
      image: "/business-management-system.jpg",
    },
    {
      icon: Shield,
      title: t("products.security.title"),
      description: t("products.security.description"),
     features: ["Security Audit", "Penetration Testing", "Compliance"],
      image: "/cybersecurity-solutions.jpg",
    },
    {
      icon: Cpu,
      title: t("products.ai.title"),
      description: t("products.ai.description"),
       features: ["Computer Vision", "NLP", "Predictive Analytics"],
      image: "/artificial-intelligence-technology.png",
    },
    {
      icon: Cloud,
      title: t("products.cloud.title"),
      description: t("products.cloud.description"),
      features: ["AWS", "Azure", "Docker & Kubernetes"],
      image: "/cloud-computing-infrastructure.jpg",
    },
  ]

  const cur = products[active]

  const Detail = ({ p, idx }: { p: Product; idx: number }) => (
    <div>
      <div className="marks relative aspect-[4/3] overflow-hidden bg-ink text-brand">
        <img key={p.image} src={p.image} alt="" className="fade h-full w-full object-cover" />
        <span className="tag absolute left-3 top-3 bg-ink px-2 py-1 text-ink-text">
          FIG. {String(idx + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-6 text-lg leading-relaxed">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.features.map((f) => (
          <li key={f} className="tag border border-line px-2.5 py-1.5 text-foreground">
            {f}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section id="dich-vu" className="sec border-t border-line bg-paper-2">
      <div className="wrap">
        <SectionHead index="02" label={t("nav.services")} note={`${products.length} ${t("products.subtitle")}`} />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="title">
              {t("products.title")} <span className="text-brand-deep">{t("products.subtitle")}</span>
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:pt-3">
            <p className="text-lg leading-relaxed text-muted-foreground">{t("products.description")}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ol className="border-t lg:col-span-6" style={{ borderTopColor: "var(--line-strong)" }}>
            {products.map((p, i) => {
              const on = i === active
              return (
                <li key={i} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={on}
                    className={`group flex w-full items-center gap-5 px-1 py-5 text-left transition-colors sm:py-6 ${on ? "text-foreground" : "text-foreground/55 hover:text-foreground"}`}
                  >
                    <span className={`tag w-8 shrink-0 ${on ? "text-brand-deep" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold leading-tight tracking-[-0.03em]">{p.title}</span>
                    <p.icon className={`h-5 w-5 shrink-0 transition-colors ${on ? "text-brand-deep" : "opacity-40"}`} />
                    <ArrowRight className={`h-5 w-5 shrink-0 transition-transform ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} aria-hidden />
                  </button>
                  {on && (
                    <div className="pb-8 lg:hidden">
                      <Detail p={p} idx={i} />
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <Detail p={cur} idx={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
