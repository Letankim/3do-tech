"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"
import { SectionHead } from "@/components/section-head"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface Testimonial {
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: string | number;
  content: string;
}

function RatingStars({ rating }: { rating: number | string }) {
  const value = Number(rating) || 0
  const fullStars = Math.floor(value)
  const hasHalf = value % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-brand text-brand" />
      ))}
      {hasHalf && (
        <StarHalf key="half" className="h-4 w-4 fill-brand text-brand" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-line" />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]); 
  const [averageRating, setAverageRating] = useState(0);

  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || testimonials.length < 2) return
    const id = setInterval(() => setCur((c) => (c + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [paused, testimonials.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          try {
            const data  = [
  {
    name: "Nguyễn Văn Hùng",
    position: "CEO",
    company: "HMS",
    avatar: "https://hms-client-psi.vercel.app/thang.jpg",
    rating: "5",
    content:
      "Hệ thống quản lý sức khỏe được triển khai rất chuyên nghiệp. Tính năng AI gợi ý dinh dưỡng và theo dõi sức khỏe giúp ích rất nhiều cho khách hàng của chúng tôi.",
  },
  {
    name: "Trần Văn Tiến",
    position: "Giám đốc Marketing",
    company: "FPT Telecom",
    avatar: "https://hms-client-psi.vercel.app/an.jpg",
    rating: "4.5",
    content:
      "Website đăng ký dịch vụ internet được phát triển nhanh chóng, giao diện thân thiện và dễ sử dụng. Khách hàng phản hồi rất tích cực.",
  },
  {
    name: "Phạm Minh Quân",
    position: "CTO",
    company: "ELearning - F",
    avatar: "https://hms-client-psi.vercel.app/cuong.jpg",
    rating: "5",
    content:
      "Nền tảng E-learning hoạt động ổn định, có thể phục vụ hàng chục nghìn học viên cùng lúc. Đặc biệt, video streaming và quiz tự động rất hữu ích.",
  },
  {
    name: "Lê Tấn Kim",
    position: "Quản lý Dự án",
    company: "LAC.ID.VN",
    avatar: "https://hms-client-psi.vercel.app/kim.jpg",
    rating: "4",
    content:
      "Website thương mại điện tử về board game được thiết kế đẹp và dễ sử dụng. Thanh toán online và quản lý kho hàng hoạt động ổn định, chỉ cần cải thiện thêm tốc độ tải trang.",
  },
  {
    name: "Đỗ Văn Thành",
    position: "Founder",
    company: "Dotesco",
    avatar: "https://hms-client-psi.vercel.app/an.jpg",
    rating: "5",
    content:
      "Website dịch vụ kỹ thuật được triển khai rất chuyên nghiệp. Hệ thống đặt lịch và quản lý khách hàng giúp chúng tôi tiết kiệm nhiều thời gian vận hành.",
  },
  {
    name: "Nguyễn Trọng Lượng",
    position: "Huấn luyện viên cá nhân",
    company: "PT",
    avatar: "https://nguyen-trong-luong.vercel.app/avatar.jpg",
    rating: "4.8",
    content:
      "Landing page quảng bá cá nhân được thiết kế hiện đại, tối ưu SEO và thu hút nhiều khách hàng tiềm năng. Tôi rất hài lòng.",
  },
];

            setTestimonials(data || []);
            if(data?.length > 0) {
              const ratings = data?.map((f: any)=> Number(f.rating) || 0);
              const sumRating = ratings.reduce((sum: number, f: number)=> sum+f, 0);
              setAverageRating(Math.round(sumRating / ratings.length));
            }
          }catch(e) {
            console.log(e);
          }
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const x = testimonials[cur]
  const go = (d: number) => setCur((c) => (c + d + testimonials.length) % testimonials.length)
  const stats = [
    { v: t("testimonials.trustIndicators.values.customerSatisfaction"), l: t("testimonials.trustIndicators.customerSatisfaction") },
    { v: t("testimonials.trustIndicators.values.support"), l: t("testimonials.trustIndicators.support") },
    { v: t("testimonials.trustIndicators.values.onTimeDelivery"), l: t("testimonials.trustIndicators.onTimeDelivery") },
    { v: `${averageRating}★`, l: t("testimonials.trustIndicators.averageRating") },
  ]

  return (
    <section ref={sectionRef} className="sec border-t border-line bg-paper-2">
      <div className="wrap">
        <SectionHead index="05" label={t("testimonials.subtitle")} note={testimonials.length ? `${String(cur + 1).padStart(2, "0")} / ${String(testimonials.length).padStart(2, "0")}` : undefined} />

        <Reveal className="mt-12 max-w-3xl">
          <h2 className="title">
            {t("testimonials.title")} <span className="text-brand-deep">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("testimonials.description")}</p>
        </Reveal>

        {x && (
          <div className="mt-14 grid gap-10 lg:grid-cols-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <figure className="lg:col-span-8" aria-live="polite">
              <span className="block font-mono text-7xl leading-none text-brand" aria-hidden>“</span>
              <blockquote key={cur} className="fade mt-2 text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-[1.35] tracking-[-0.02em]">
                {x.content}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-none">
                    <AvatarImage src={x.avatar || "/placeholder.svg"} alt="" className="object-cover" />
                    <AvatarFallback className="rounded-none bg-ink font-semibold text-ink-text">
                      {x.name.split(" ").map((n) => n[0]).join("").slice(-2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{x.name}</div>
                    <div className="tag mt-0.5 text-muted-foreground">
                      {x.position} · {x.company}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <RatingStars rating={x.rating} />
                  <div className="flex">
                    <button type="button" onClick={() => go(-1)} aria-label="Đánh giá trước" className="grid h-11 w-11 place-items-center border border-line transition-colors hover:bg-ink hover:text-ink-text">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Đánh giá tiếp theo" className="-ml-px grid h-11 w-11 place-items-center border border-line transition-colors hover:bg-ink hover:text-ink-text">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </figcaption>
            </figure>

            <ul className="border-t border-line lg:col-span-4" aria-label="Danh sách khách hàng">
              {testimonials.map((p, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setCur(i)}
                    aria-current={i === cur ? "true" : undefined}
                    className={`flex w-full items-center gap-3 border-b border-line px-1 py-3.5 text-left transition-colors ${i === cur ? "text-foreground" : "text-foreground/50 hover:text-foreground"}`}
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 ${i === cur ? "bg-brand" : "bg-line"}`} aria-hidden />
                    <span className="flex-1 truncate font-semibold">{p.name}</span>
                    <span className="tag truncate">{p.company}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <dl className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          {stats.map((st, i) => (
            <div key={i} className="border-b border-r border-line bg-paper-3 p-6">
              <dd className="text-4xl font-extrabold tracking-[-0.04em]">{st.v}</dd>
              <dt className="tag mt-2 text-muted-foreground">{st.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
