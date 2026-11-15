"use client"

import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"
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


// Bo cuc 12 cot: hang 1 rong-hep, hang 2 hep-rong, hang 3 chia doi
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"]

export function RealProjectsSection() {
  const { t } = useLanguage()

  return (
    <section id="san-pham-thuc-te" className="sec bg-ink text-ink-text">
      <div className="wrap">
        <SectionHead dark index="03" label={t("nav.projects")} note={`${products.length} / ${t("realProjects.subtitle")}`} />

        <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="title">
              {t("realProjects.title")} <span className="text-brand">{t("realProjects.titleHighlight")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{t("realProjects.description")}</p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/projects" className="btn btn-ghost-dark">
              {t("realProjects.button.viewAll")}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {products.map((p, i) => {
            const done = t(p.status) === t("realProjects.sucesss")
            return (
              <Reveal key={p.id} delay={(i % 2) * 90} className={`group ${SPANS[i]}`}>
                <div className="marks relative aspect-[16/10] overflow-hidden bg-ink-3 text-ink-muted">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={t(p.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="tag absolute left-3 top-3 bg-ink/85 px-2 py-1 text-ink-text">
                    P.{String(p.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="tag text-ink-muted">{p.category}</span>
                  <span className={`tag inline-flex items-center gap-2 ${done ? "text-ok" : "text-brand"}`}>
                    <span className="h-1.5 w-1.5 bg-current" aria-hidden />
                    {t(p.status)}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em]">{t(p.titleKey)}</h3>
                <p className="mt-2 line-clamp-2 leading-relaxed text-ink-muted">{t(p.descriptionKey)}</p>
                <p className="tag mt-4 text-ink-text/80">{p.features.join("  /  ")}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
