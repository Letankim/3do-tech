import { StickyHeader } from "@/components/sticky-header"
import { HeroSection } from "@/components/hero-section"
import { AchievementsSection } from "@/components/achievements-section"
import { MarqueeBand } from "@/components/marquee-band"
import { CompanyIntro } from "@/components/company-intro"
import { ProductsSection } from "@/components/products-section"
import { RealProjectsSection } from "@/components/real-projects-section"
import { PartnersSection } from "@/components/partners-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <AchievementsSection />
      <MarqueeBand />
      <CompanyIntro />
      <ProductsSection />
      <RealProjectsSection />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  )
}
