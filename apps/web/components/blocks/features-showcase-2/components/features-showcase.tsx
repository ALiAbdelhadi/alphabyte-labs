import type React from "react"
import { Ban, CreditCard, Shield, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    variant: "amber" | "cyan" | "emerald" | "blue"
    className?: string
}

function FeatureCard({ icon, title, description, variant, className }: FeatureCardProps) {
    const variantStyles = {
        amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30",
        cyan: "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800/30",
        emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30",
        blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30",
    }

    const iconStyles = {
        amber: "text-amber-600 dark:text-amber-400",
        cyan: "text-cyan-600 dark:text-cyan-400",
        emerald: "text-emerald-600 dark:text-emerald-400",
        blue: "text-blue-600 dark:text-blue-400",
    }

    return (
        <div
            className={cn(
                "p-6 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
                variantStyles[variant],
                className,
            )}
        >
            <div className="mb-4">
                <div className={cn("h-8 w-8 transition-colors duration-200", iconStyles[variant])}>{icon}</div>
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground transition-colors duration-200">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200">{description}</p>
        </div>
    )
}

export default function FeaturesShowcase() {
    const features = [
        {
            icon: <CreditCard className="h-8 w-8" />,
            title: "Modern Cards",
            description: "Up-to-date payment methods for convenience and efficiency.",
            variant: "amber" as const,
        },
        {
            icon: <Ban className="h-8 w-8" />,
            title: "No Extra Fees",
            description: "Transparent pricing with no hidden charges.",
            variant: "cyan" as const,
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Super Secure",
            description: "Advanced security measures to protect your transactions.",
            variant: "amber" as const,
        },
        {
            icon: <Smartphone className="h-8 w-8" />,
            title: "Contactless Payments",
            description: "Convenient and hygienic transactions with tap-and-go technology.",
            variant: "emerald" as const,
        },
    ]

    return (
        <section className="py-16 px-4 bg-background transition-colors duration-200">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3 text-foreground transition-colors duration-200">
                        Custom-built for financial exchanges
                    </h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
                        Our platform offers secure and efficient transaction capabilities, tailored to meet diverse payment needs
                        with robust features.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            variant={feature.variant}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
