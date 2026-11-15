"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Cpu, Database, Shield, Smartphone, Globe, Cloud } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/50">
      {/* Deep space background with stars */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Central wireframe globe background */}
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 opacity-20">
          <div className="relative w-96 h-96">
            {/* Wireframe sphere structure */}
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"></div>
            <div className="absolute inset-4 border border-cyan-400/20 rounded-full"></div>
            <div className="absolute inset-8 border border-cyan-400/15 rounded-full"></div>

            {/* Vertical lines */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -translate-x-1/2"></div>
            <div className="absolute top-0 left-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent transform -translate-x-1/2"></div>
            <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent transform translate-x-1/2"></div>

            {/* Horizontal lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -translate-y-1/2"></div>
            <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -translate-y-1/2"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform translate-y-1/2"></div>

            {/* Glowing center point */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-lg shadow-cyan-400/50"></div>

            {/* Glowing ring above */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 border-4 border-cyan-400/40 rounded-full animate-pulse">
                <div className="absolute inset-2 border-2 border-cyan-300/30 rounded-full">
                  <div className="absolute inset-2 bg-cyan-400/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              {/* Light beam */}
              <div className="absolute top-full left-1/2 w-1 h-32 bg-gradient-to-b from-cyan-400/50 to-transparent transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              {t("hero.title")} <span className="text-primary">{t("hero.subtitle")}</span>
              <br />
              {t("hero.titleSecondary")}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-balance mb-8 leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-accent-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                {t("hero.cta.primary")}
                
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/5 hover:text-primary/90"
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {t("hero.cta.secondary")}
              </Button>
            </div>
          </div>

          {/* Right side - Tech visualization */}
          <div className="relative hidden lg:block">
            {/* Central tech hub */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Main central circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse">
                <div className="absolute inset-4 bg-background/80 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: "8s" }} />
                </div>
              </div>

              {/* Floating tech icons with collision effects */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center animate-bounce border border-blue-500/30">
                <Smartphone className="w-8 h-8 text-blue-500" />
              </div>

              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center animate-bounce delay-300 border border-green-500/30">
                <Database className="w-8 h-8 text-green-500" />
              </div>

              <div className="absolute top-4 -left-12 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center animate-bounce delay-500 border border-purple-500/30">
                <Globe className="w-7 h-7 text-purple-500" />
              </div>

              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center animate-bounce delay-700 border border-orange-500/30">
                <Cloud className="w-7 h-7 text-orange-500" />
              </div>

              <div className="absolute bottom-4 -right-12 w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center animate-bounce delay-1000 border border-red-500/30">
                <Shield className="w-7 h-7 text-red-500" />
              </div>

              {/* Collision effect lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-90 animate-pulse delay-1000"></div>
              </div>

              {/* Orbiting particles */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent rounded-full transform -translate-x-1/2"></div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "15s", animationDirection: "reverse" }}
              >
                <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-green-500 rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute -top-16 right-16 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
            <div className="absolute -bottom-16 left-16 w-6 h-6 bg-accent/20 rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-32 -right-8 w-4 h-4 bg-blue-500/20 rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
