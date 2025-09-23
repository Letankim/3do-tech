"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const products = [
  {
    id: 1,
    titleKey: "products.mobile.title",
    descriptionKey: "products.mobile.description",
    features: ["React Native", "Flutter", "Native iOS/Android"],
    image: "/mobile-app-development.png",
    category: "Mobile",
    status: "realProjects.sucesss",
  },
  {
    id: 2,
    titleKey: "products.web.title",
    descriptionKey: "products.web.description",
    features: ["Next.js", "React", "Vue.js"],
    image: "/modern-website-design.png",
    category: "Web",
    status: "realProjects.sucesss",
  },
  {
    id: 3,
    titleKey: "products.management.title",
    descriptionKey: "products.management.description",
    features: ["ERP", "CRM", "Inventory Management"],
    image: "/business-management-system.jpg",
    category: "Management",
    status: "realProjects.sucesss",
  },
  {
    id: 4,
    titleKey: "products.security.title",
    descriptionKey: "products.security.description",
    features: ["Security Audit", "Penetration Testing", "Compliance"],
    image: "/cybersecurity-solutions.jpg",
    category: "Security",
    status: "realProjects.isProgress",
  },
  {
    id: 5,
    titleKey: "products.ai.title",
    descriptionKey: "products.ai.description",
    features: ["Computer Vision", "NLP", "Predictive Analytics"],
    image: "/artificial-intelligence-technology.png",
    category: "AI & Data",
    status: "Hoàn thành",
  },
  {
    id: 6,
    titleKey: "products.cloud.title",
    descriptionKey: "products.cloud.description",
    features: ["AWS", "Azure", "Docker & Kubernetes"],
    image: "/cloud-computing-infrastructure.jpg",
    category: "Cloud",
    status: "realProjects.sucesss",
  },
]

export function RealProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    )

    const section = document.getElementById("san-pham-thuc-te")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="san-pham-thuc-te" className="py-16 sm:py-20 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4 sm:mb-6">
            {t("realProjects.title")} <span className="text-primary">{t("realProjects.titleHighlight")}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {t("realProjects.description")}
          </p>
        </div>

        {/* Grid sản phẩm/dự án */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={t(product.titleKey)}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {product.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={t(product.status) === "Hoàn thành" ? "default" : "outline"}
                    className={t(product.status) === "Hoàn thành" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}
                  >
                    {t(product.status)}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                  {t(product.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(product.descriptionKey)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center">
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 bg-primary text-white hover:bg-white hover:text-primary hover:border-primary transition-colors"
            >
              {t("realProjects.button.viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
