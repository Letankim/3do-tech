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
    <section className="border-t border-border bg-muted/60">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={i} delay={i * 60} className="border-border px-1 py-10 odd:border-r lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0">
              <dd className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                <Counter end={a.number} suffix={a.suffix} />
              </dd>
              <dt className="mt-3 text-sm font-semibold">{a.label}</dt>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
