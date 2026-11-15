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
    <section id="dich-vu" className="section-y border-t border-border">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3"><b>02</b>{t("nav.services")}</p>
          <div className="lg:col-span-9">
            <h2 className="h2 max-w-3xl">
              {t("products.title")} <span className="text-primary">{t("products.subtitle")}</span>
            </h2>
            <p className="lead mt-6 max-w-2xl">{t("products.description")}</p>
          </div>
        </Reveal>

        <ol className="mt-14 border-t border-foreground">
          {products.map((p, i) => (
            <Reveal key={i} as="li" delay={(i % 3) * 40} className="group grid gap-x-8 gap-y-3 border-b border-border py-7 md:grid-cols-12 md:items-baseline">
              <span className="font-serif text-lg tabular-nums text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-2xl font-semibold leading-tight transition-colors group-hover:text-primary md:col-span-4">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-4">{p.description}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground md:col-span-3 md:justify-end">
                {p.features.map((f) => (
                  <li key={f} className="after:ml-3 after:content-['/'] after:text-border last:after:hidden">{f}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
