"use client"

import { motion } from "framer-motion"
import {
    BarChart3,
    ChevronRight,
    Globe,
    LineChart,
    Settings,
    Shield,
} from "lucide-react"
import { useState } from "react"

export default function FeaturesShowcase3() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    const features = [
        {
            icon: <LineChart className="h-6 w-6" />,
            title: "Performance Analytics",
            description:
                "Advanced metrics and insights to optimize your business operations and track growth.",
            color: "bg-gradient-to-br from-blue-50 to-blue-100",
            iconColor: "text-blue-600",
            hoverColor: "from-blue-100 to-blue-200",
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "Military-grade encryption and compliance protocols to protect your sensitive data.",
            color: "bg-gradient-to-br from-purple-50 to-purple-100",
            iconColor: "text-purple-600",
            hoverColor: "from-purple-100 to-purple-200",
        },
        {
            icon: <Settings className="h-6 w-6" />,
            title: "Seamless Integration",
            description:
                "Connect with your existing tech stack through our extensive API and integration ecosystem.",
            color: "bg-gradient-to-br from-amber-50 to-amber-100",
            iconColor: "text-amber-600",
            hoverColor: "from-amber-100 to-amber-200",
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Advanced Reporting",
            description:
                "Customizable dashboards and reports that deliver actionable business intelligence.",
            color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
            iconColor: "text-emerald-600",
            hoverColor: "from-emerald-100 to-emerald-200",
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Global Infrastructure",
            description:
                "Distributed architecture ensuring reliability, scalability, and low-latency worldwide.",
            color: "bg-gradient-to-br from-rose-50 to-rose-100",
            iconColor: "text-rose-600",
            hoverColor: "from-rose-100 to-rose-200",
        },
    ]

    return (
        <section className="py-24 px-6 md:px-12 ">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
                        Enterprise-Grade Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Robust features designed to optimize operations, enhance security, and accelerate your organization's digital transformation.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-2xl p-8 overflow-hidden transition-all duration-300 ease-out ${feature.color}`}
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className={`absolute inset-0 z-0 transition-opacity duration-300 ${hoveredFeature === index ? `bg-gradient-to-br ${feature.hoverColor}` : ""
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
                            />
                            <div className="relative z-10">
                                <div className={`${feature.iconColor} mb-5`}>{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                <motion.div
                                    className="flex items-center text-sm font-medium cursor-pointer group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className={`${feature.iconColor}`}>Learn more</span>
                                    <ChevronRight
                                        className={`h-4 w-4 ml-1 ${feature.iconColor} transition-transform group-hover:translate-x-1`}
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
