"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Globe, Database, Shield, Cpu, Cloud } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

interface Product {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  image: string
}

export function ProductsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
    <section ref={sectionRef} id="dich-vu" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            {t("products.title")} <span className="text-primary">{t("products.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {t("products.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:shadow-xl transition-all duration-500 p-0 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(product.features) ? (
                    product.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {feature}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      No features available
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  className="relative overflow-hidden group p-0 transition-colors hover:bg-primary/10"
                >
                  <span>{t("products.learnMore")}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />

                  {/* Hiệu ứng sáng chạy ngang */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out"></span>
                </Button>

              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="text-lg px-8 py-6">
              {t("products.viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}