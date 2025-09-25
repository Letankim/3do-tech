"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { ExternalLink, Calendar, Users, Search } from "lucide-react"
import { useState, useMemo } from "react"
import projectsData from "@/data/projects.json"
import { useLanguage } from "@/lib/i18n"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

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

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            {t("projects.title")} <span className="text-primary">{t("projects.titleHighlight")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed mb-8">
            {t("projects.description")}
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("projects.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-5 py-6 pl-10 text-base"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm hover:bg-primary/80 hover:text-white"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 && (
            <div className="mb-8">
              <p className="text-muted-foreground">
                {t("projects.showing")} {filteredProjects.length} {t("projects.projects")}
                {selectedCategory !== "Tất cả" && ` ${t("projects.inCategory")} "${selectedCategory}"`}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={project.status === "Hoàn thành" ? "default" : "outline"}
                      className={
                        project.status === "Hoàn thành" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.completedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.teamSize}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-primary block">{project.client}</span>
                      <span className="text-xs text-muted-foreground">
                        {t("projects.duration")}: {project.duration}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 hover:bg-primary hover:text-white transition-colors"
                       onClick={() => router.push(`${project?.link}`)}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-0 flex flex-col justify-center align-center">
              <span className="text-center">
                <svg
                  data-v-ad307406=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="240"
                  height="240"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="m-auto lucide animal-icon flip lucide-animal-icon lucide-animal animal-icon flip"
                >
                  <path d="M13 16a3 3 0 0 1 2.24 5"></path>
                  <path d="M18 12h.01"></path>
                  <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"></path>
                  <path d="M20 8.54V4a2 2 0 1 0-4 0v3"></path>
                  <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"></path>
                </svg>
              </span>
              <p className="text-muted-foreground text-lg">{t("projects.noResults")}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}