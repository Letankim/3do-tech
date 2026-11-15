"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { Star, StarHalf } from "lucide-react"
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
        <Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
      {hasHalf && (
        <StarHalf key="half" className="h-4 w-4 fill-amber-400 text-amber-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-border" />
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
      async ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          try {
            const response = await fetch("/api/feedback");
            if(!response.ok) {
              throw new Error("Fail to get feedback");
            }

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

  const stats = [
    { v: t("testimonials.trustIndicators.values.customerSatisfaction"), l: t("testimonials.trustIndicators.customerSatisfaction") },
    { v: t("testimonials.trustIndicators.values.support"), l: t("testimonials.trustIndicators.support") },
    { v: t("testimonials.trustIndicators.values.onTimeDelivery"), l: t("testimonials.trustIndicators.onTimeDelivery") },
  ]

  return (
    <section ref={sectionRef} className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h2">
            {t("testimonials.title")} <span className="text-primary">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="lead mt-4">{t("testimonials.description")}</p>
        </Reveal>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((x, index) => (
              <div key={index} className="min-w-0 pl-4 sm:pl-5" style={{ flex: "0 0 min(92%, 26rem)" }}>
                <figure className="surface flex h-full flex-col p-6">
                  <RatingStars rating={x.rating} />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">{x.content}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={x.avatar || "/placeholder.svg"} alt="" />
                      <AvatarFallback className="bg-accent text-sm font-semibold text-primary">
                        {x.name.split(" ").map((n) => n[0]).join("").slice(-2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-sm">
                      <div className="truncate font-semibold">{x.name}</div>
                      <div className="truncate text-muted-foreground">
                        {x.position} · {x.company}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {stats.map((st, i) => (
            <div key={i}>
              <dd className="text-3xl font-extrabold tracking-tight text-primary">{st.v}</dd>
              <dt className="mt-1 text-sm text-muted-foreground">{st.l}</dt>
            </div>
          ))}
          <div>
            <dd className="flex items-center justify-center gap-1 text-3xl font-extrabold tracking-tight text-primary">
              {averageRating}
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" aria-hidden />
            </dd>
            <dt className="mt-1 text-sm text-muted-foreground">{t("testimonials.trustIndicators.averageRating")}</dt>
          </div>
        </dl>
      </div>
    </section>
  )
}
