"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CaseStudy {
  id: string
  title: string
  description: string
  image: string
}

interface CaseStudiesCarouselProps {
  title: string
  description: string
  caseStudies: CaseStudy[]
}

export default function CaseStudiesCarousel({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  caseStudies = [
    {
      id: "shadcn",
      title: "shadcn/ui: Building a Modern Component Library",
      description:
        "Explore how shadcn/ui revolutionized React component development",
      image: "/blocks/case-studies-1/image-1.jpg",
    },
    {
      id: "tailwind",
      title: "Tailwind CSS: The Utility-First Revolution",
      description:
        "Discover how Tailwind CSS transformed the way developers style applications",
      image: "/blocks/case-studies-1/image-2.jpg",
    },
    {
      id: "astro",
      title: "Astro: The All-in-One Web Framework",
      description:
        "Learn how Astro's innovative 'Islands Architecture' and zero-JS approach",
      image: "/blocks/case-studies-1/image-3.jpg",
    },
    {
      id: "react",
      title: "React: Pioneering Component-Based UI",
      description:
        "See how React continues to shape modern web development with its component model",
      image: "/blocks/case-studies-1/image-4.jpg",
    },
    {
      id: "nextjs",
      title: "Next.js: The React Framework",
      description:
        "Explore how Next.js has become the go-to framework for React applications",
      image: "/blocks/case-studies-1/image-5.jpg",
    },
  ],
}: CaseStudiesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollAbility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollAbility()
    window.addEventListener("resize", checkScrollAbility)
    return () => window.removeEventListener("resize", checkScrollAbility)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.querySelector("div[data-card]")?.clientWidth || 300
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
      if (direction === "left" && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      } else if (
        direction === "right" &&
        activeIndex < caseStudies.length - 1
      ) {
        setActiveIndex(activeIndex + 1)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll("div[data-card]")
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        })
        setActiveIndex(index)
      }
    }
  }

  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-6 bg-white dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div className="max-w-3xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              {description}
            </p>
          </div>
          <div className="flex space-x-2 self-end">
            <button
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
        <div className="relative w-full overflow-hidden" aria-live="polite">
          <div
            ref={carouselRef}
            className="flex w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 md:gap-6 pb-8"
            onScroll={() => {
              checkScrollAbility()
              if (carouselRef.current) {
                const scrollLeft = carouselRef.current.scrollLeft
                const cardWidth =
                  carouselRef.current.querySelector("div[data-card]")
                    ?.clientWidth || 300
                const newIndex = Math.round(scrollLeft / cardWidth)
                if (
                  newIndex !== activeIndex &&
                  newIndex >= 0 &&
                  newIndex < caseStudies.length
                ) {
                  setActiveIndex(newIndex)
                }
              }
            }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                data-card
                className="min-w-[240px] md:min-w-[300px] lg:min-w-[360px] flex-shrink-0 snap-start rounded-xl overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                }}
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2">
                      {study.description}
                    </p>
                    <button className="flex items-center text-white text-sm md:text-base font-medium group/btn">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-gray-800 dark:bg-white w-4"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
