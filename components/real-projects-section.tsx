"use client"

import { Reveal } from "@/components/reveal"
import { ArrowRight } from "lucide-react"
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
  const { t } = useLanguage()

  return (
    <section id="san-pham-thuc-te" className="section-y border-t border-border bg-muted/50">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow"><b>03</b>{t("nav.projects")}</span>
            <h2 className="h2 mt-4">
              {t("realProjects.title")} <span className="text-primary">{t("realProjects.titleHighlight")}</span>
            </h2>
            <p className="lead mt-4">{t("realProjects.description")}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-semibold transition-colors hover:border-primary/50"
          >
            {t("realProjects.button.viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const done = t(p.status) === "Hoàn thành"
            return (
              <Reveal key={p.id} delay={(i % 3) * 70} className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-foreground">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={t(p.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className="uppercase tracking-wider text-primary">{p.category}</span>
                    <span className={`inline-flex items-center gap-1.5 ${done ? "text-success" : "text-signal"}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      {t(p.status)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug">{t(p.titleKey)}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{t(p.descriptionKey)}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
