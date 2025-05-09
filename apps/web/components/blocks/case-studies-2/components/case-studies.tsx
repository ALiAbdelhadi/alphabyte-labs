"use client"

import type React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react"

import { useOutsideClick } from "@/hooks/out-side-click"

interface CaseStudy {
  id: string
  title: string
  description: string
  image: string
  category: string
  fullDescription?: string
  link?: string
  technologies?: string[]
  company?: string
  content?: React.ReactNode
}

interface CaseStudiesCarouselProps {
  title: string
  description: string
  caseStudies: CaseStudy[]
}

// Create context for the carousel
const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export default function CaseStudiesCarousel({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  caseStudies = [
    {
      id: "shadcn",
      title: "shadcn/ui: Building a Modern Component Library",
      description:
        "Explore how shadcn/ui revolutionized React component development",
      category: "Component Library",
      fullDescription:
        "shadcn/ui has transformed how developers build React applications by providing a collection of reusable components that are both beautiful and accessible. Unlike traditional component libraries, shadcn/ui offers a unique approach where you copy and own the code, allowing for maximum customization while maintaining a consistent design language. This case study explores how this innovative approach has changed the component library landscape.",
      technologies: ["React", "Radix UI", "Tailwind CSS", "TypeScript"],
      company: "shadcn",
      link: "https://ui.shadcn.com",
      image: "/blocks/case-studies-1/image-1.jpg",
    },
    {
      id: "tailwind",
      title: "Tailwind CSS: The Utility-First Revolution",
      description:
        "Discover how Tailwind CSS transformed the way developers style applications",
      category: "CSS Framework",
      fullDescription:
        "Tailwind CSS introduced a utility-first approach to styling that has dramatically changed how developers build interfaces. By providing low-level utility classes, Tailwind enables rapid UI development without leaving your HTML, resulting in more consistent designs and faster development cycles. This case study examines how Tailwind CSS has grown from a controversial idea to one of the most popular styling solutions in modern web development.",
      technologies: ["CSS", "PostCSS", "JavaScript", "HTML"],
      company: "Tailwind Labs",
      link: "https://tailwindcss.com",
      image: "/blocks/case-studies-1/image-2.jpg",
    },
    {
      id: "astro",
      title: "Astro: The All-in-One Web Framework",
      description:
        "Learn how Astro's innovative 'Islands Architecture' and zero-JS approach",
      category: "Web Framework",
      fullDescription:
        "Astro has pioneered the 'Islands Architecture' approach, allowing developers to build faster websites by shipping less JavaScript to the client. By default, Astro renders your entire site to static HTML, then selectively hydrates only the interactive components when needed. This case study explores how Astro's innovative approach has enabled developers to build high-performance websites without sacrificing developer experience.",
      technologies: ["JavaScript", "TypeScript", "HTML", "CSS"],
      company: "Astro",
      link: "https://astro.build",
      image: "/blocks/case-studies-1/image-3.jpg",
    },
    {
      id: "react",
      title: "React: Pioneering Component-Based UI",
      description:
        "See how React continues to shape modern web development with its component model",
      category: "JavaScript Library",
      fullDescription:
        "React introduced a component-based architecture that has fundamentally changed how developers build user interfaces. By breaking UIs into reusable, composable components and introducing a virtual DOM for efficient updates, React established patterns that have influenced virtually every modern frontend framework. This case study examines React's journey from a controversial library to the foundation of modern web development.",
      technologies: ["JavaScript", "JSX", "Virtual DOM", "Hooks"],
      company: "Meta (formerly Facebook)",
      link: "https://react.dev",
      image: "/blocks/case-studies-1/image-4.jpg",
    },
    {
      id: "nextjs",
      title: "Next.js: The React Framework",
      description:
        "Explore how Next.js has become the go-to framework for React applications",
      category: "React Framework",
      fullDescription:
        "Next.js has established itself as the leading React framework by providing an elegant solution to common challenges in web development. With features like server-side rendering, static site generation, and automatic code splitting, Next.js enables developers to build high-performance React applications with minimal configuration. This case study explores how Next.js has evolved to address the needs of modern web applications.",
      technologies: ["React", "JavaScript", "TypeScript", "Server Components"],
      company: "Vercel",
      link: "https://nextjs.org",
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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // Small buffer
    }
  }

  useEffect(() => {
    checkScrollAbility()
    window.addEventListener("resize", checkScrollAbility)
    return () => window.removeEventListener("resize", checkScrollAbility)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 224 : 320
      const gap = window.innerWidth < 768 ? 16 : 24
      const scrollPosition = index * (cardWidth + gap)

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      setActiveIndex(index)
    }
  }

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex: activeIndex }}
    >
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
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
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
              className="flex w-full overflow-x-auto hide-scrollbar gap-4 md:gap-8 pb-8"
              onScroll={checkScrollAbility}
            >
              {caseStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  card={study}
                  index={index}
                  layout={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

function CaseStudyCard({
  card,
  index,
  layout = false,
}: {
  card: CaseStudy
  index: number
  layout?: boolean
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { onCardClose } = useContext(CarouselContext)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useOutsideClick(containerRef, () => handleClose())

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    onCardClose(index)
  }

  const cardContent = card.content || (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
        {card.fullDescription || card.description}
      </p>
      {card.technologies && card.technologies.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {card.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      {card.image && (
        <div className="relative">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover w-full h-[100px]"
          />
        </div>
      )}
      {card.company && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Company
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{card.company}</p>
        </div>
      )}
      {card.link && (
        <div className="pt-4">
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-white transition-colors"
          >
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-y-auto hide-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/50 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.id}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.id}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.id}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{cardContent}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.id}` : undefined}
        onClick={handleOpen}
        className="relative h-[360px] md:h-[440px] lg:h-[500px] z-10 flex flex-col items-start justify-start overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-900 flex-shrink-0"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.id}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.id}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
        />
      </motion.button>
    </>
  )
}
