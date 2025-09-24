"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Target, Eye, Lightbulb } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function CompanyIntro() {
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

  return (
    <section ref={sectionRef} id="gioi-thieu" className="py-24 bg-muted/30">
      <div className="px-2 max-w-7xl mx-auto md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            {t("company.intro.title")} <span className="text-primary">{t("company.intro.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-4xl mx-auto leading-relaxed">
            {t("company.intro.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: t("company.mission.title"),
              description: t("company.mission.description"),
              delay: "delay-200",
            },
            {
              icon: Eye,
              title: t("company.vision.title"),
              description: t("company.vision.description"),
              delay: "delay-400",
            },
            {
              icon: Lightbulb,
              title: t("company.coreValues.title"),
              description: t("company.coreValues.description"),
              delay: "delay-600",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`p-8 text-center hover:shadow-lg transition-all duration-500 ${isVisible ? `opacity-100 translate-y-0 ${item.delay}` : "opacity-0 translate-y-10"}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}