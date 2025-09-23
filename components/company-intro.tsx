"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Target, Eye, Lightbulb } from "lucide-react"

export function CompanyIntro() {
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
    <section ref={sectionRef} id="gioi-thieu" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Về <span className="text-primary">3DO TECH</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-4xl mx-auto leading-relaxed">
            Chúng tôi là đội ngũ chuyên gia công nghệ với hơn 10 năm kinh nghiệm, cam kết mang đến những giải pháp sáng
            tạo và hiệu quả nhất cho khách hàng.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Sứ mệnh",
              description:
                "Tạo ra những sản phẩm công nghệ có tác động tích cực đến cuộc sống và kinh doanh của khách hàng.",
              delay: "delay-200",
            },
            {
              icon: Eye,
              title: "Tầm nhìn",
              description: "Trở thành công ty công nghệ hàng đầu Việt Nam, tiên phong trong việc ứng dụng AI và IoT.",
              delay: "delay-400",
            },
            {
              icon: Lightbulb,
              title: "Giá trị cốt lõi",
              description:
                "Đổi mới sáng tạo, chất lượng vượt trội, và cam kết phục vụ khách hàng với tâm huyết cao nhất.",
              delay: "delay-600",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`p-8 text-center hover:shadow-lg transition-all duration-500 ${isVisible ? `opacity-100 translate-y-0 ${item.delay}` : "opacity-0 translate-y-10"}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
