"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)

          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, isVisible])

  return (
    <span ref={counterRef} className="animate-count-up">
      {count}
      {suffix}
    </span>
  )
}

export function AchievementsSection() {
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

  const achievements = [
    {
      number: 10,
      suffix: "+",
      label: t("achievements.experience"),
      description: t("achievements.experienceDescription"),
    },
    {
      number: 500,
      suffix: "+",
      label: t("achievements.projects"),
      description: t("achievements.projectsDescription"),
    },
    {
      number: 200,
      suffix: "+",
      label: t("achievements.clients"),
      description: t("achievements.clientsDescription"),
    },
    {
      number: 50,
      suffix: "+",
      label: t("achievements.team"),
      description: t("achievements.teamDescription"),
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            {t("achievements.title")} <span className="text-primary">{t("achievements.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {t("achievements.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className={`p-8 text-center hover:shadow-lg transition-all duration-500 ${isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <Counter end={achievement.number} suffix={achievement.suffix} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{achievement.label}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}