"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"

export function CTASection() {
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
    <section ref={sectionRef} className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white p-12 md:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/tech-circuit-pattern.jpg')] bg-repeat opacity-20"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Sẵn sàng biến ý tưởng thành <span className="text-white/90">hiện thực?</span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 text-balance mb-12 leading-relaxed">
                Hãy để 3DO TECH đồng hành cùng bạn trong hành trình chuyển đổi số. Chúng tôi cam kết mang đến giải pháp
                tối ưu nhất cho doanh nghiệp của bạn.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-accent text-white hover:bg-white/90 hover:text-primary px-8 py-4 text-lg font-semibold group"
                >
                  Bắt đầu dự án ngay
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  Tư vấn miễn phí
                </Button>
              </div>

              {/* Contact options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-3 text-white/90">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">+84 123 456 789</span>
                </div>

                <div className="flex items-center justify-center space-x-3 text-white/90">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">hello@3dotech.vn</span>
                </div>

                <div className="flex items-center justify-center space-x-3 text-white/90">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Chat trực tuyến</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional trust elements */}
        <div
          className={`mt-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg">Được tin tưởng bởi hơn 200+ doanh nghiệp tại Việt Nam</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-muted-foreground">Phản hồi nhanh</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Bảo mật dữ liệu</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">5 năm</div>
              <div className="text-sm text-muted-foreground">Bảo hành dài hạn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Hỗ trợ kỹ thuật</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
