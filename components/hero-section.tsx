"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="pt-28 sm:pt-32 lg:pt-40">
      <div className="container-x grid gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">3DO TECH · Cần Thơ</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="display mt-5">
              {t("hero.title")} <em className="text-primary not-italic">{t("hero.subtitle")}</em> {t("hero.titleSecondary")}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead mt-7 max-w-xl">{t("hero.description")}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#lien-he"
                className="inline-flex h-12 items-center gap-2 rounded bg-ink px-6 text-[15px] font-semibold text-ink-foreground transition-opacity hover:opacity-90"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#san-pham-thuc-te" className="text-[15px] font-semibold underline decoration-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-primary">
                {t("hero.cta.secondary")}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <figure>
            <div className="overflow-hidden rounded border border-border bg-card">
              <img src="/project_dotesco.png" alt="Giao diện website Dotesco do 3DO TECH thực hiện" className="aspect-[4/3] w-full object-cover object-top" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
              <span>Dotesco, website dịch vụ kỹ thuật</span>
              <Link href="/projects" className="shrink-0 font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                Xem dự án
              </Link>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="border-t border-border">
        <Link
          href="/add-in-office"
          className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-sm transition-colors hover:text-primary"
        >
          <span>
            <strong className="mr-2 text-signal">Mới</strong>
            Add-in chuẩn hóa thể thức văn bản Word và trang in Excel, miễn phí
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            Tải về <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </div>
    </section>
  )
}
