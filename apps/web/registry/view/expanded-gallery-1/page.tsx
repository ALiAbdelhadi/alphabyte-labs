"use client"

import Container from "@/components/Container"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"
import ExpandableGallery from "./components/expanded-gallery"
import { galleryItems } from "./constant"

export default function GalleryPage() {
  const [active, setActive] = useState("shadcn")
  const isMobile = useIsMobile()

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div className={cn("min-h-screen py-8 sm:py-12 md:py-16", "bg-[#f5f5f7] dark:bg-zinc-900")}>
      <Container className="max-w-[1200px] px-4 sm:px-6 md:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className={cn(
            "transition-all duration-700 ease-out",
            isMobile
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
              : "flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5",
          )}
        >
          {galleryItems.map((item, index) => (
            <ExpandableGallery key={item.id} {...item} index={index} active={active} handleActive={setActive} />
          ))}
        </motion.div>
      </Container>
    </div>
  )
}
