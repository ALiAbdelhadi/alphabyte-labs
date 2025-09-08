"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { gsap } from "gsap"

type PageTransitionProps = {
    children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const locale = useLocale()

    useEffect(() => {
        if (!containerRef.current) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
            )
        }, containerRef)
        return () => ctx.revert()
    }, [pathname, locale])

    return <div ref={containerRef}>{children}</div>
}


