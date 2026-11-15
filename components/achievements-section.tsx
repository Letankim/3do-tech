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
    <section className="bg-ink text-ink-text" aria-label={`${t("achievements.title")}${t("achievements.subtitle")}`}>
      <div className="wrap">
        <div className="tag flex items-center gap-4 pb-4 text-ink-muted">
          <span>
            {t("achievements.title")}
            {t("achievements.subtitle")}
          </span>
          <span className="h-px flex-1 bg-ink-line" aria-hidden />
        </div>
      </div>
      <div className="border-y border-ink-line">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className={`py-8 sm:py-10 ${i % 2 === 0 ? "pr-5" : "border-l border-ink-line pl-5"} ${i < 2 ? "border-b border-ink-line lg:border-b-0" : ""} lg:px-8 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-ink-line" : ""}`}
            >
              <dd className="text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.05em]">
                <Counter end={a.number} suffix={a.suffix} />
              </dd>
              <dt className="mt-4 font-semibold">{a.label}</dt>
              <p className="tag mt-1.5 text-ink-muted">{a.description}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
