"use client"

import { Reveal } from "@/components/reveal"
import { Smartphone, Globe, Database, Shield, Cpu, Cloud } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface Product {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  image: string
}

export function ProductsSection() {
  const { t } = useLanguage()

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

  return (
    <section id="dich-vu" className="section-y">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{t("nav.services")}</span>
          <h2 className="h2 mt-4">
            {t("products.title")} <span className="text-primary">{t("products.subtitle")}</span>
          </h2>
          <p className="lead mt-4">{t("products.description")}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 70} className="surface surface-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary">
                    <p.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
