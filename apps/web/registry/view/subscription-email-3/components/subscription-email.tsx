"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"

interface CheckmarkProps {
    size?: number
    strokeWidth?: number
    className?: string
    color?: string
}

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: i * 0.2,
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                ease: "easeInOut",
            },
            opacity: { delay: i * 0.2, duration: 0.2 },
        },
    }),
}

export function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }: CheckmarkProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            className={className}
        >
            <title>Animated Checkmark</title>
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                variants={draw}
                custom={0}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.path
                d="M30 50L45 65L70 35"
                stroke={color}
                variants={draw}
                custom={1}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "transparent",
                }}
            />
        </motion.svg>
    )
}
export default function SubscriptionEmail() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative w-full max-w-2xl mx-auto transition-all"
        >
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-xl shadow-black/[0.04] dark:shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/[0.02] dark:to-transparent rounded-3xl pointer-events-none" />
                <div className="relative">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-zinc-900 dark:text-white">
                                    Stay Updated
                                </h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                                    Get notified when we launch new features and updates.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                                <div className="space-y-4">
                                    <div
                                        className="relative transition-all duration-200"
                                    >
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full px-4 py-3.5 bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 outline-none transition-colors duration-200 focus:bg-white dark:focus:bg-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-600"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !email}
                                        className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                                    </Button>
                                </div>
                            </form>
                            <p className="text-xs text-center mt-6 text-zinc-500 dark:text-zinc-500 max-w-sm mx-auto">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center py-4"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                                    <Checkmark
                                        size={64}
                                        strokeWidth={4}
                                        className="relative z-10 text-green-600 dark:text-green-400"
                                    />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-white">
                                You're all set!
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                                Thanks for subscribing. We'll keep you updated with our latest news.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}