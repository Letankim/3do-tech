"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { Star, Quote, StarHalf } from "lucide-react"
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
        <Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalf && (
        <StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
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
                        <RatingStars rating={testimonial.rating} />
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
              <div className="flex justify-center items-center gap-1 text-3xl font-bold text-primary mb-2">
                 <span>{averageRating}</span>
                 <Star className="w-6 h-6"/>
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

