import { StickyHeader } from "@/components/sticky-header";
import { HeroSection } from "@/components/hero-section";
import { CompanyIntro } from "@/components/company-intro";
import { AchievementsSection } from "@/components/achievements-section";
import { PartnersSection } from "@/components/partners-section";
import { ProductsSection } from "@/components/products-section";
import { RealProjectsSection } from "@/components/real-projects-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { SalesChatbotPopup } from "../components/SalesChatbotPopup";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <CompanyIntro />
      <AchievementsSection />
      <PartnersSection />
      <ProductsSection />
      <RealProjectsSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <SalesChatbotPopup />
    </main>
  );
}
