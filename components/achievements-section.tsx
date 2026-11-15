"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"
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
    <span ref={counterRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function AchievementsSection() {
  const { t } = useLanguage()

  const achievements = [
    { number: 2, suffix: "+", label: t("achievements.experience"), description: t("achievements.experienceDescription") },
    { number: 20, suffix: "+", label: t("achievements.projects"), description: t("achievements.projectsDescription") },
    { number: 5, suffix: "+", label: t("achievements.clients"), description: t("achievements.clientsDescription") },
    { number: 30, suffix: "+", label: t("achievements.team"), description: t("achievements.teamDescription") },
  ]

  return (
    <section className="section-y bg-ink text-ink-foreground">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <h2 className="h2">
            {t("achievements.title")} <span className="text-signal">{t("achievements.subtitle")}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-foreground/70">{t("achievements.description")}</p>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={i} delay={i * 70} className="bg-ink p-6 sm:p-8">
              <dd className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                <Counter end={a.number} suffix={a.suffix} />
              </dd>
              <dt className="mt-3 font-semibold">{a.label}</dt>
              <p className="mt-1 text-sm leading-relaxed text-ink-foreground/60">{a.description}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
