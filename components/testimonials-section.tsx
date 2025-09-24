"use client"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function TestimonialsSection() {
  const { t } = useLanguage() 
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [AutoPlay({ delay: 5000, stopOnInteraction: false })],
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

  // Testimonials data using translation keys
  const testimonials = [
    {
      name: t("testimonials.items.1.name"),
      position: t("testimonials.items.1.position"),
      company: t("testimonials.items.1.company"),
      avatar: "/customer-avatar-1.jpg",
      rating: t("testimonials.items.1.rating"),
      content: t("testimonials.items.1.content"),
    },
    {
      name: t("testimonials.items.2.name"),
      position: t("testimonials.items.2.position"),
      company: t("testimonials.items.2.company"),
      avatar: "/customer-avatar-2.jpg",
      rating: t("testimonials.items.2.rating"),
      content: t("testimonials.items.2.content"),
    },
    {
      name: t("testimonials.items.3.name"),
      position: t("testimonials.items.3.position"),
      company: t("testimonials.items.3.company"),
      avatar: "/customer-avatar-3.jpg",
      rating: t("testimonials.items.3.rating"),
      content: t("testimonials.items.3.content"),
    },
    {
      name: t("testimonials.items.4.name"),
      position: t("testimonials.items.4.position"),
      company: t("testimonials.items.4.company"),
      avatar: "/customer-avatar-4.jpg",
      rating: t("testimonials.items.4.rating"),
      content: t("testimonials.items.4.content"),
    },
    {
      name: t("testimonials.items.5.name"),
      position: t("testimonials.items.5.position"),
      company: t("testimonials.items.5.company"),
      avatar: "/customer-avatar-5.jpg",
      rating: t("testimonials.items.5.rating"),
      content: t("testimonials.items.5.content"),
    },
    {
      name: t("testimonials.items.6.name"),
      position: t("testimonials.items.6.position"),
      company: t("testimonials.items.6.company"),
      avatar: "/customer-avatar-6.jpg",
      rating: t("testimonials.items.6.rating"),
      content: t("testimonials.items.6.content"),
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="px-2 max-w-7xl mx-auto md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            {t("testimonials.title")} <span className="text-primary">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {t("testimonials.description")}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_auto] min-w-0 pl-4 md:pl-6"
                  style={{ flex: "0 0 90%" }}
                >
                  <Card className="p-4 md:p-6 h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <Quote className="h-8 w-8 text-primary/30" />
                      <div className="flex items-center space-x-1">
                        {[...Array(Number(testimonial.rating))].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-lg leading-relaxed mb-8 text-foreground/90">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position} tại {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {t("testimonials.trustIndicators.values.customerSatisfaction")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("testimonials.trustIndicators.customerSatisfaction")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {t("testimonials.trustIndicators.values.support")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("testimonials.trustIndicators.support")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {t("testimonials.trustIndicators.values.onTimeDelivery")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("testimonials.trustIndicators.onTimeDelivery")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {t("testimonials.trustIndicators.values.averageRating")}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("testimonials.trustIndicators.averageRating")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}