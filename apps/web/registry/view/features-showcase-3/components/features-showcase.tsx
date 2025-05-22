import { HeartPulse, Stethoscope, ShieldCheck, Activity } from "lucide-react"

export default function FeaturesShowcase() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Secure & Compliant by Default",
            description:
                "Built with end-to-end encryption and fully compliant with HIPAA standards to safeguard patient data and ensure trust.",
        },
        {
            icon: HeartPulse,
            title: "Realtime Vital Signs Display",
            description:
                "Designed for critical care environments — instantly render and update patient vitals with zero lag and clinical-grade precision.",
        },
        {
            icon: Stethoscope,
            title: "Ergonomic for Medical Workflows",
            description:
                "Crafted for doctors, nurses, and specialists. Clear layouts and intuitive spacing reduce cognitive load in high-pressure scenarios.",
        },
        {
            icon: Activity,
            title: "Live Health Metrics & Analytics",
            description:
                "Visualize trends, charts, and diagnostic data in real-time. Engineered for clarity and speed in data-driven medical decisions.",
        },
    ]

    return (
        <section className="w-full py-20 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-neutral-50 mb-4">
                        Healthcare-Optimized Components
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-300 text-lg max-w-2xl mx-auto">
                        Designed specifically for medical interfaces with a focus on clarity, performance, and compliance.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-neutral-100 dark:border-neutral-700 transition-all duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                        >
                            <div className="h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                            </div>
                            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-50 mb-3">{feature.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
