"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
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

  const testimonials = [
    {
      name: "Nguyễn Văn Minh",
      position: "CEO",
      company: "TechStart Vietnam",
      avatar: "/customer-avatar-1.jpg",
      rating: 5,
      content:
        "3DO TECH đã giúp chúng tôi xây dựng một hệ thống quản lý hoàn hảo. Đội ngũ chuyên nghiệp, tận tâm và luôn đáp ứng đúng thời hạn. Chất lượng sản phẩm vượt ngoài mong đợi.",
    },
    {
      name: "Trần Thị Hương",
      position: "Giám đốc Marketing",
      company: "Fashion House",
      avatar: "/customer-avatar-2.jpg",
      rating: 5,
      content:
        "Ứng dụng mobile mà 3DO TECH phát triển cho chúng tôi đã tăng doanh số lên 300%. Giao diện đẹp, tính năng đầy đủ và trải nghiệm người dùng tuyệt vời.",
    },
    {
      name: "Lê Hoàng Nam",
      position: "CTO",
      company: "FinTech Solutions",
      avatar: "/customer-avatar-3.jpg",
      rating: 5,
      content:
        "Giải pháp bảo mật mà 3DO TECH cung cấp rất chuyên nghiệp. Họ đã giúp chúng tôi vượt qua tất cả các kiểm tra bảo mật nghiêm ngặt của ngân hàng.",
    },
    {
      name: "Phạm Thị Lan",
      position: "Giám đốc Điều hành",
      company: "Healthcare Plus",
      avatar: "/customer-avatar-4.jpg",
      rating: 5,
      content:
        "Hệ thống quản lý bệnh viện do 3DO TECH phát triển đã cải thiện đáng kể hiệu quả công việc. Nhân viên dễ sử dụng và bệnh nhân hài lòng hơn.",
    },
    {
      name: "Võ Minh Tuấn",
      position: "Founder",
      company: "EduTech Vietnam",
      avatar: "/customer-avatar-5.jpg",
      rating: 5,
      content:
        "Nền tảng học trực tuyến mà 3DO TECH xây dựng cho chúng tôi có thể phục vụ hàng nghìn học viên cùng lúc mà vẫn ổn định. Rất ấn tượng!",
    },
    {
      name: "Đặng Thị Mai",
      position: "Marketing Director",
      company: "Retail Chain",
      avatar: "/customer-avatar-6.jpg",
      rating: 5,
      content:
        "Hệ thống POS và quản lý chuỗi cửa hàng từ 3DO TECH giúp chúng tôi tiết kiệm 40% thời gian quản lý và tăng độ chính xác trong báo cáo.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Khách hàng <span className="text-primary">nói gì</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Hơn 200+ khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
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
                  <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <Quote className="h-8 w-8 text-primary/30" />
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
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
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Khách hàng hài lòng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Hỗ trợ kỹ thuật</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Dự án đúng hạn</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5★</div>
              <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
