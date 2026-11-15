"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MessageCircle, Sparkles, Shield, Clock, Users } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function CTASection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto md:px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="relative overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 p-16 md:p-24">
            {/* Subtle accent elements */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" />
                {t("cta.badge") || "Transform Your Business"}
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-balance mb-8 leading-tight">
                <span className="gradient-text">{t("cta.title") || "Ready to elevate"}</span>
                <br />
                <span className="text-foreground">{t("cta.titleHighlight") || "your success?"}</span>
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-16 leading-relaxed max-w-3xl mx-auto">
                {t("cta.description") ||
                  "Join thousands of businesses that trust us to deliver exceptional results. Let's build something extraordinary together."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-semibold rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("cta.buttons.startProject") || "Start Your Project"}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border hover:bg-primary/90 px-10 py-6 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
                >
                  {t("cta.buttons.freeConsultation") || "Free Consultation"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{t("cta.contact.phone") || "Call Us"}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{t("cta.contact.email") || "Email Us"}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{t("cta.contact.chat") || "Live Chat"}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div
          className={`mt-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-lg font-medium">
              {t("cta.trustElements.tagline") || "Trusted by industry leaders worldwide"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:bg-card/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {t("cta.trustElements.quickResponse.title") || "24h"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("cta.trustElements.quickResponse.description") || "Quick Response"}
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:bg-card/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {t("cta.trustElements.dataSecurity.title") || "100%"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("cta.trustElements.dataSecurity.description") || "Data Security"}
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:bg-card/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {t("cta.trustElements.warranty.title") || "5yr"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("cta.trustElements.warranty.description") || "Warranty"}
              </div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:bg-card/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {t("cta.trustElements.support.title") || "24/7"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("cta.trustElements.support.description") || "Support"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
