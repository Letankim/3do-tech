"use client"

import { useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { useLanguage } from "@/lib/i18n"

export function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [AutoPlay({ delay: 3000, stopOnInteraction: false })],
  )

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

  // Sample partner logos - in a real app, these would be actual partner logos
  const partners = [
    { name: "Microsoft", logo: "/microsoft-logo.png" },
    { name: "Google", logo: "/google-logo.png" },
    { name: "Amazon", logo: "/amazon-logo.png" },
    { name: "Meta", logo: "/meta-logo-abstract.png" },
    { name: "Apple", logo: "/apple-logo.png" },
    { name: "Samsung", logo: "/samsung-logo.png" },
    { name: "Intel", logo: "/intel-logo.png" },
    { name: "IBM", logo: "/ibm-logo.png" },
  ]

  return (
    <section ref={sectionRef} id="doi-tac" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            {t("partners.title")} <span className="text-primary">{t("partners.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {t("partners.description")}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_auto] min-w-0 pl-4 md:pl-8"
                  style={{ flex: "0 0 200px" }}
                >
                  <div className="flex items-center justify-center h-24 bg-card rounded-lg border hover:shadow-md transition-shadow duration-300 p-6">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {t("partners.additional")} <span className="font-semibold text-primary">{t("partners.additionalHighlight")}</span>{t("partners.additionalmore")}
          </p>
        </div>
      </div>
    </section>
  )
}