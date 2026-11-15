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
    titleKey: "realProjects.projects.1.title",
    descriptionKey: "realProjects.projects.1.description",
    features: ["AI Gợi ý dinh dưỡng", "Theo dõi sức khỏe", "PT Online"],
    image: "/hms_product.png",
    category: "HealthTech & AI",
    status: "realProjects.sucesss",
  },
  {
    id: 2,
    titleKey: "realProjects.projects.2.title",
    descriptionKey: "realProjects.projects.2.description",
    features: ["Next.js", "React", "Vue.js"],
    image: "/project_fpttelecom.png",
    category: "Website dịch vụ",
    status: "realProjects.sucesss",
  },
  {
    id: 3,
    titleKey: "realProjects.projects.3.title",
    descriptionKey: "realProjects.projects.3.description",
    features: ["Video Streaming", "Quiz Tự động", "Quản lý tiến độ học tập"],
    image: "/project_elearning.png",
    category: "Giáo dục",
    status: "realProjects.isProgress",
  },
  {
    id: 4,
    titleKey: "realProjects.projects.4.title",
    descriptionKey: "realProjects.projects.4.description",
    features: ["Thanh toán Online", "Quản lý kho", "E-commerce"],
    image: "/project_lac.id.vn.png",
    category: "Thương mại điện tử",
    status: "realProjects.sucesss",
  },
  {
    id: 5,
    titleKey: "realProjects.projects.5.title",
    descriptionKey: "realProjects.projects.5.description",
    features: ["Đặt lịch dịch vụ", "Quản lý khách hàng", "Giới thiệu dịch vụ"],
    image: "/project_dotesco.png",
    category: "Doanh nghiệp dịch vụ",
    status: "realProjects.sucesss",
  },
  {
    id: 6,
    titleKey: "realProjects.projects.6.title",
    descriptionKey: "realProjects.projects.6.description",
    features: ["Landing Page", "SEO", "Tối ưu Marketing"],
    image: "/project_landing_page_Pt.png",
    category: "Marketing",
    status: "realProjects.sucesss",
  },
];


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
