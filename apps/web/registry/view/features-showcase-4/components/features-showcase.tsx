"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { BarChart3, ChevronRight, Globe, LineChart, Settings, Shield } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface Feature {
    icon: React.ReactNode
    title: string
    description: string
    color: {
        light: string
        dark: string
    }
    iconColor: {
        light: string
        dark: string
    }
    hoverColor: {
        light: string
        dark: string
    }
}

export default function FeaturesShowcase3() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    const features: Feature[] = [
        {
            icon: <LineChart className="h-6 w-6" />,
            title: "Performance Analytics",
            description: "Advanced metrics and insights to optimize your business operations and track growth.",
            color: {
                light: "bg-gradient-to-br from-blue-50 to-blue-100",
                dark: "bg-gradient-to-br from-blue-950/40 to-blue-900/30",
            },
            iconColor: {
                light: "text-blue-600",
                dark: "text-blue-400",
            },
            hoverColor: {
                light: "from-blue-100 to-blue-200",
                dark: "from-blue-900/50 to-blue-800/40",
            },
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "Military-grade encryption and compliance protocols to protect your sensitive data.",
            color: {
                light: "bg-gradient-to-br from-purple-50 to-purple-100",
                dark: "bg-gradient-to-br from-purple-950/40 to-purple-900/30",
            },
            iconColor: {
                light: "text-purple-600",
                dark: "text-purple-400",
            },
            hoverColor: {
                light: "from-purple-100 to-purple-200",
                dark: "from-purple-900/50 to-purple-800/40",
            },
        },
        {
            icon: <Settings className="h-6 w-6" />,
            title: "Seamless Integration",
            description: "Connect with your existing tech stack through our extensive API and integration ecosystem.",
            color: {
                light: "bg-gradient-to-br from-amber-50 to-amber-100",
                dark: "bg-gradient-to-br from-amber-950/40 to-amber-900/30",
            },
            iconColor: {
                light: "text-amber-600",
                dark: "text-amber-400",
            },
            hoverColor: {
                light: "from-amber-100 to-amber-200",
                dark: "from-amber-900/50 to-amber-800/40",
            },
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Advanced Reporting",
            description: "Customizable dashboards and reports that deliver actionable business intelligence.",
            color: {
                light: "bg-gradient-to-br from-emerald-50 to-emerald-100",
                dark: "bg-gradient-to-br from-emerald-950/40 to-emerald-900/30",
            },
            iconColor: {
                light: "text-emerald-600",
                dark: "text-emerald-400",
            },
            hoverColor: {
                light: "from-emerald-100 to-emerald-200",
                dark: "from-emerald-900/50 to-emerald-800/40",
            },
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Global Infrastructure",
            description: "Distributed architecture ensuring reliability, scalability, and low-latency worldwide.",
            color: {
                light: "bg-gradient-to-br from-rose-50 to-rose-100",
                dark: "bg-gradient-to-br from-rose-950/40 to-rose-900/30",
            },
            iconColor: {
                light: "text-rose-600",
                dark: "text-rose-400",
            },
            hoverColor: {
                light: "from-rose-100 to-rose-200",
                dark: "from-rose-900/50 to-rose-800/40",
            },
        },
    ]

    return (
        <section className="py-24 px-6 md:px-12 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4 transition-colors duration-300">
                        Enterprise-Grade Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
                        Robust features designed to optimize operations, enhance security, and accelerate your organization's
                        digital transformation.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                "relative rounded-2xl p-8 overflow-hidden transition-all duration-300 ease-out border",
                                "dark:border-gray-800 border-gray-200 shadow-sm hover:shadow-md",
                                feature.color.light,
                                "dark:" + feature.color.dark,
                            )}
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            role="article"
                            aria-labelledby={`feature-title-${index}`}
                        >
                            <motion.div
                                className={cn(
                                    "absolute inset-0 z-0 transition-opacity duration-300",
                                    hoveredFeature === index ? `bg-gradient-to-br ${feature.hoverColor.light}` : "",
                                    hoveredFeature === index ? `dark:bg-gradient-to-br dark:${feature.hoverColor.dark}` : "",
                                )}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
                                aria-hidden="true"
                            />
                            <div className="relative z-10">
                                <div
                                    className={cn(
                                        feature.iconColor.light,
                                        "dark:" + feature.iconColor.dark,
                                        "mb-5 transition-colors duration-300",
                                    )}
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    id={`feature-title-${index}`}
                                    className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300"
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed transition-colors duration-300">
                                    {feature.description}
                                </p>
                                <motion.div
                                    className="flex items-center text-sm font-medium cursor-pointer group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Learn more about ${feature.title}`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault()
                                        }
                                    }}
                                >
                                    <span
                                        className={cn(
                                            feature.iconColor.light,
                                            "dark:" + feature.iconColor.dark,
                                            "transition-colors duration-300",
                                        )}
                                    >
                                        Learn more
                                    </span>
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 ml-1 transition-transform group-hover:translate-x-1",
                                            feature.iconColor.light,
                                            "dark:" + feature.iconColor.dark,
                                            "transition-colors duration-300",
                                        )}
                                        aria-hidden="true"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
