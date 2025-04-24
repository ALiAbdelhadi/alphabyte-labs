"use client"

import Container from "@/components/Container"
import { services } from "@/registry/view/service-1/constant"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MoveRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger)
export default function Services() {
  const [activeService, setActiveService] = useState<number>(2)
  const sectionRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="bg-background text-foreground py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      <Container>
        <span className="text-sm uppercase tracking-wider text-muted-foreground">
          OUR SERVICES
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              What <span className="text-primary">Services</span>
              <br />
              We&apos;re Offering
            </h2>
          </div>
          <div className="hidden lg:block relative">
            <p className="text-muted-foreground mt-6 max-w-xl leading-6">
              We empower businesses to thrive online. Our services enhance
              online visibility, expand market reach, and boost revenue through
              effective digital strategies.
            </p>
          </div>
        </div>
        <div className="mt-16 space-y-4 md:space-y-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card border-b border-border pb-4 md:pb-6`}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="group flex items-center justify-between cursor-pointer">
                <Link href={service.link} className="space-y-2 flex-1">
                  <h3
                    className={`text-xl md:text-2xl lg:text-3xl font-medium transition-colors duration-300 ${
                      activeService === index
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-base md:text-lg leading-5 lg:leading-[1.4] transition-all duration-500 md:max-w-xl max-w-[240px] overflow-hidden ${
                      activeService === index
                        ? "text-muted-foreground h-auto opacity-100"
                        : "h-0 opacity-0"
                    }`}
                  >
                    {service.description}
                  </p>
                </Link>
                <MoveRight
                  className={`w-6 h-6 transition-transform duration-500 ${
                    activeService === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-6"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
