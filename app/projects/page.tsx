"use client"

import { Input } from "@/components/ui/input"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { ArrowUpRight, Calendar, Users, Search, SearchX } from "lucide-react"
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
    <div className="min-h-screen bg-background">
      <StickyHeader />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative pb-10">
          <span className="eyebrow">{t("nav.projects")}</span>
          <h1 className="display mt-4 max-w-3xl !text-[clamp(2rem,4.6vw,3.25rem)]">
            {t("projects.title")} <span className="text-primary">{t("projects.titleHighlight")}</span>
          </h1>
          <p className="lead mt-5 max-w-2xl">{t("projects.description")}</p>

          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                placeholder={t("projects.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t("projects.searchPlaceholder")}
                className="h-12 rounded-xl bg-card pl-11 text-base"
              />
            </div>
          </div>

          <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Lọc theo lĩnh vực">
            {categories.map((category) => {
              const on = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={on}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6 sm:pb-28">
        <div className="container-x">
          {filteredProjects.length > 0 && (
            <p className="mb-6 text-sm text-muted-foreground">
              {t("projects.showing")} <strong className="text-foreground">{filteredProjects.length}</strong> {t("projects.projects")}
              {selectedCategory !== "Tất cả" && ` ${t("projects.inCategory")} "${selectedCategory}"`}
            </p>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const done = project.status === "Hoàn thành"
              return (
                <article key={project.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                      <span className="uppercase tracking-wider text-primary">{project.category}</span>
                      <span className={`inline-flex items-center gap-1.5 ${done ? "text-success" : "text-signal"}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                        {project.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug">{project.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>

                    <div className="mt-4 flex gap-5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" aria-hidden />{project.completedDate}</span>
                      <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" aria-hidden />{project.teamSize}</span>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">{tech}</li>
                      ))}
                      {project.technologies.length > 4 && (
                        <li className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">+{project.technologies.length - 4}</li>
                      )}
                    </ul>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <div className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{project.client}</span>
                        <span className="text-xs text-muted-foreground">{t("projects.duration")}: {project.duration}</span>
                      </div>
                      {project.link && (
                        <Link
                          href={`${project.link}`}
                          aria-label={`Mở ${project.title}`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center py-20 text-center">
              <SearchX className="h-12 w-12 text-muted-foreground/60" aria-hidden />
              <p className="mt-4 text-lg text-muted-foreground">{t("projects.noResults")}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
