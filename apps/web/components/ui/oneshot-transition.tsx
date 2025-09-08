"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type OneShotTransitionProps = {
    children: React.ReactNode
    from?: { opacity?: number; y?: number }
    to?: { opacity?: number; y?: number; duration?: number; ease?: string }
}

export default function OneShotTransition({
    children,
    from = { opacity: 0 },
    to = { opacity: 1, duration: 0.35, ease: "power2.out" },
}: OneShotTransitionProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                from,
                {
                    ...to,
                    onComplete: () => {
                        if (ref.current) {
                            // Clear transform so position: sticky continues to work on children (e.g., Header)
                            gsap.set(ref.current, { clearProps: "transform" })
                        }
                    },
                }
            )
        }, ref)
        return () => ctx.revert()
        // empty deps → run once on mount
    }, [])

    return <div ref={ref}>{children}</div>
}


