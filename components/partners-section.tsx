"use client"

import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function PartnersSection() {
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

  const partners = [
    { name: "Dotesco", logo: "/dotesco.png" },
    { name: "FPT Telecom", logo: "/fpttelecom.png" },
    { name: "HMS", logo: "/hms.png" },
    { name: "3DO Court", logo: "/meta-logo-abstract.png" },
    { name: "LAC.ID.VN", logo: "/lac.jpg" },
    { name: "Letankim.ID.VN", logo: "/letankim.jpg" },
    { name: "Dotesco", logo: "/dotesco.png" },
    { name: "FPT Telecom", logo: "/fpttelecom.png" },
    { name: "HMS", logo: "/hms.png" },
    { name: "3DO Court", logo: "/meta-logo-abstract.png" },
    { name: "LAC.ID.VN", logo: "/lac.jpg" },
    { name: "Letankim.ID.VN", logo: "/letankim.jpg" },
  ]

  return (
    <section id="doi-tac" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("nav.products")}</span>
          <h2 className="h2 mt-4">
            {t("partners.title")} <span className="text-primary">{t("partners.subtitle")}</span>
          </h2>
          <p className="lead mt-4">{t("partners.description")}</p>
        </Reveal>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {partners.map((partner, index) => (
              <div key={index} className="min-w-0 pl-4" style={{ flex: "0 0 190px" }}>
                <div className="surface grid h-24 place-items-center p-5">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="max-h-12 max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-muted-foreground">
          {t("partners.additional")} <span className="font-semibold text-primary">{t("partners.additionalHighlight")}</span>
          {t("partners.additionalmore")}
        </p>
      </div>
    </section>
  )
}
