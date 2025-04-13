"use client"

import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Image, { ImageProps } from "next/image"
import {
  createContext,
  Fragment,
  JSX,
  useEffect,
  useRef,
  useState,
} from "react"
import { useOutsideClick } from "@/hooks/out-side-click"
import { cn } from "@/lib/utils"

interface CarouselProps {
  items: JSX.Element[]
  initialScroll?: number
  cardGap?: number
  scrollOffset?: number
  initialActiveIndex?: number
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const CarouselContext = createContext<{
  onCardClick: (index: number) => void
  currentIndex: number
}>({
  onCardClick: () => { },
  currentIndex: 0,
})

export const CarouselProject = ({
  items,
  initialScroll = 0,
  cardGap = 16,
  scrollOffset: initialScrollOffset,
  initialActiveIndex = 1,
}: CarouselProps) => {
  const [scrollOffset, setScrollOffset] = useState(950)
  useEffect(() => {
    const WidthWindow = window.innerWidth
    if (WidthWindow < 789) {
      setScrollOffset(260)
    } else {
      setScrollOffset(950)
    }
  }, [])
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(initialActiveIndex)
  const checkScrollAbility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }
  useEffect(() => {
    if (carouselRef.current && initialActiveIndex !== undefined) {
      const itemWidth = carouselRef.current.offsetWidth - 500
      const scrollTo = itemWidth * initialActiveIndex
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }, [initialActiveIndex])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollOffset : scrollOffset,
        behavior: "smooth",
      })
    }
  }
  const handleCarouselClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <CarouselContext.Provider
      value={{ onCardClick: handleCarouselClick, currentIndex }}
    >
      <div className="relative w-full py-0 !my-12 ">
        <div className="flex justify-end space-x-2">
          <button
            className="relative z-40 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-7 w-7 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-7 w-7 text-gray-500" />
          </button>
        </div>
        <div
          className="flex w-full overflow-x-scroll py-6 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollAbility}
        >
          <div
            className="flex flex-row justify-end gap-4"
            style={{ gap: `${cardGap}px` }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 * index },
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const CardProject = ({
  project,
  index,
  layout = false,
}: {
  project: Project
  index: number
  layout?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  useOutsideClick(containerRef, () => setIsOpen(false))
  const handleCardClick = () => {
    setIsOpen(true)
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }
  return (
    <Fragment>
      <motion.div
        ref={cardRef}
        layoutId={layout ? `card-${project.id}` : undefined}
        onClick={handleCardClick}
        className="rounded-3xl cursor-pointer bg-gray-100 dark:bg-neutral-900 h-72 md:h-[33rem] w-[35vh] sm:w-[50vh] md:w-[90vh] lg:w-[110vh] xl:w-[150vh] overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `title-${project.id}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left font-sans mt-2"
          >
            {project.title}
          </motion.p>
          <motion.p
            layoutId={layout ? `description-${project.id}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left mt-2"
          >
            {project.description}
          </motion.p>
        </div>
        <BlurImage
          src={project.image}
          alt={project.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.div>
    </Fragment>
  )
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src || "/placeholder.svg"}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  )
}
