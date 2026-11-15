"use client"

import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { ArrowUpRight, Search } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useState, useMemo } from "react"
import projectsData from "@/data/projects.json"
import { useLanguage } from "@/lib/i18n"
import Link from "next/link"

const categories = [
  "Tất cả",
  "Hệ thống quản lý",
  "Ứng dụng di động",
  "Giáo dục",
  "IoT & AI",
  "Thương mại điện tử",
  "Logistics",
  "Y tế",
  "Fintech",
]

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === "Tất cả" || project.category === selectedCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-paper">
      <StickyHeader />

      <section className="bg-ink text-ink-text">
        <div className="wrap pb-12 pt-28 sm:pt-32 lg:pt-40">
          <Reveal>
            <p className="tag text-ink-muted">
              <span className="text-brand">[ {t("nav.projects")} ]</span> {projectsData.length} / Portfolio
            </p>
            <h1 className="mega mt-8 text-[clamp(3rem,9vw,8rem)]">
              {t("projects.title")} <span className="text-brand">{t("projects.titleHighlight")}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-text/75">{t("projects.description")}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 border-t border-ink-line pt-8 lg:grid-cols-12 lg:items-center">
            <label className="relative block lg:col-span-4">
              <span className="sr-only">{t("projects.searchPlaceholder")}</span>
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
                type="search"
                placeholder={t("projects.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full border-0 border-b border-ink-line bg-transparent pl-7 text-lg text-ink-text outline-none placeholder:text-ink-muted focus:border-brand"
              />
            </label>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:col-span-8 lg:justify-end" role="group" aria-label="Lọc theo lĩnh vực">
              {categories.map((category) => {
                const on = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={on}
                    className={`tag shrink-0 border px-3 py-2 transition-colors ${on ? "border-brand bg-brand text-ink" : "border-ink-line text-ink-text/75 hover:border-ink-text hover:text-ink-text"}`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec !pt-12">
        <div className="wrap">
          <div className="tag flex items-center gap-4 text-muted-foreground">
            <span>
              {t("projects.showing")} <span className="text-foreground">{filteredProjects.length}</span> {t("projects.projects")}
              {selectedCategory !== "Tất cả" && ` ${t("projects.inCategory")} "${selectedCategory}"`}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const done = project.status === "Hoàn thành"
              const Card = (
                <>
                  <div className="marks relative aspect-[16/10] overflow-hidden bg-paper-2 text-foreground/40">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="tag absolute left-3 top-3 bg-ink px-2 py-1 text-ink-text">P.{String(project.id).padStart(2, "0")}</span>
                    {project.link && (
                      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center bg-brand text-ink opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="tag text-muted-foreground">{project.category}</span>
                    <span className={`tag inline-flex items-center gap-2 ${done ? "text-ok" : "text-brand-deep"}`}>
                      <span className="h-1.5 w-1.5 bg-current" aria-hidden />
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em]">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-muted-foreground">{project.description}</p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 font-mono text-xs">
                    <div>
                      <dt className="tag text-muted-foreground">{t("realProjects.meta.client")}</dt>
                      <dd className="mt-1 truncate">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="tag text-muted-foreground">{t("projects.duration")}</dt>
                      <dd className="mt-1 truncate">{project.duration}</dd>
                    </div>
                    <div>
                      <dt className="tag text-muted-foreground">{t("realProjects.meta.teamSize")}</dt>
                      <dd className="mt-1 truncate">{project.teamSize}</dd>
                    </div>
                  </dl>
                  <p className="tag mt-4 text-foreground/70">
                    {project.technologies.slice(0, 4).join("  /  ")}
                    {project.technologies.length > 4 && `  +${project.technologies.length - 4}`}
                  </p>
                </>
              )
              return (
                <Reveal key={project.id} as="article" className="group">
                  {project.link ? (
                    <Link href={`${project.link}`} className="block">
                      {Card}
                    </Link>
                  ) : (
                    Card
                  )}
                </Reveal>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="marks mt-10 flex flex-col items-center bg-paper-3 py-20 text-center text-foreground/30">
              <span className="font-mono text-6xl text-foreground/20">∅</span>
              <p className="mt-4 text-lg text-muted-foreground">{t("projects.noResults")}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
