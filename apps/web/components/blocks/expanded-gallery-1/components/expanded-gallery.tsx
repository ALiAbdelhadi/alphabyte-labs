"use client"

import type React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface ExpandableGalleryProps {
  id: string
  imgUrl: string
  title: string
  index: number
  active: string
  handleActive: (id: string) => void
  description?: string
}

const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleActive,
  description = "",
}) => {
  const isMobile = useIsMobile()
  const isActive = active === id

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: isMobile ? index * 0.08 : index * 0.12,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={itemVariants}
      className={cn(
        "relative flex items-center justify-center min-w-[120px] xs:min-w-[150px]",
        "transition-all duration-500 ease-out cursor-pointer overflow-hidden",
        "h-[280px] xs:h-[320px] sm:h-[420px] md:h-[520px] lg:h-[580px]",
        isActive
          ? "flex-[10] sm:flex-[8] md:flex-[6] lg:flex-[3.5]"
          : "flex-[1.2] sm:flex-[1.3] md:flex-[1.4] lg:flex-[0.2]",
        "rounded-xl md:rounded-2xl",
        "shadow-[0_2px_10px_rgba(0,0,0,0.08)]",
        "hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      )}
      onClick={() => handleActive(id)}
      layout
    >
      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 65%)"
            : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0) 100%)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          fill
          src={imgUrl || "/placeholder.svg"}
          alt={title}
          className={cn("object-cover")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 2}
        />
      </motion.div>
      <AnimatePresence>
        {!isActive ? (
          <motion.div
            key={`title-${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "absolute z-20",
              "bottom-5 left-5 text-[16px] xs:text-[17px] sm:text-[18px]",
              "lg:text-[20px] lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]",
              "font-medium tracking-tight text-white",
              "drop-shadow-sm"
            )}
          >
            {title}
          </motion.div>
        ) : (
          <motion.div
            key={`content-${id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute bottom-0 w-full z-20",
              "p-5 xs:p-6 sm:p-6",
              "flex justify-start flex-col",
              "backdrop-blur-[8px] bg-black/30"
            )}
          >
            <h2
              className={cn(
                "font-medium text-[20px] xs:text-[22px] sm:text-[24px] md:text-[28px]",
                "text-white mb-2 tracking-tight leading-tight"
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "text-white/90 text-sm sm:text-base",
                  "max-w-md font-light leading-relaxed",
                  "line-clamp-3 sm:line-clamp-none"
                )}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ExpandableGallery
