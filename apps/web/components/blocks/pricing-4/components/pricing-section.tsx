import type React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PricingSection() {
    return (
        <div className={cn("w-full py-16 px-4 md:px-6 lg:px-8", "bg-white dark:bg-black")}>
            <div className="max-w-6xl mx-auto">
                <h2
                    className={cn(
                        "text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16",
                        "text-slate-900 dark:text-white",
                    )}
                >
                    Pricing that scales with
                    <br />
                    your business
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <div
                        className={cn(
                            "rounded-xl shadow-lg p-6 flex flex-col",
                            "bg-white border border-slate-200",
                            "dark:bg-zinc-900 dark:border-zinc-800",
                        )}
                    >
                        <div className="mb-6">
                            <h3 className={cn("text-xl font-semibold mb-2", "text-slate-900 dark:text-white")}>Essentials Plan</h3>
                            <div className="flex items-baseline">
                                <span className={cn("text-3xl font-bold", "text-slate-900 dark:text-white")}>$14.99</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                            </div>
                            <p className="text-muted-foreground mt-2 text-sm">Perfect for solopreneurs and content creators</p>
                        </div>
                        <button
                            className={cn(
                                "w-full py-2.5 px-4 rounded-full transition mb-6",
                                "bg-slate-100 hover:bg-slate-200 text-slate-900",
                                "dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white",
                            )}
                        >
                            Get Started
                        </button>
                        <div className="mt-2">
                            <p className={cn("text-xs uppercase font-semibold mb-4", "text-slate-500 dark:text-zinc-500")}>
                                FEATURES
                            </p>
                            <ul className="space-y-3">
                                <Feature>5 social media accounts</Feature>
                                <Feature>Unlimited scheduled posts</Feature>
                                <Feature>Visual content calendar</Feature>
                                <Feature>Basic analytics dashboard</Feature>
                                <Feature>Best time to post recommendations</Feature>
                                <Feature>Mobile app access</Feature>
                                <Feature>Email support</Feature>
                                <Feature>7-day free trial</Feature>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "rounded-xl shadow-lg p-6 flex flex-col relative md:transform md:-translate-y-2 md:scale-105 z-10",
                            "bg-white border border-slate-200",
                            "dark:bg-zinc-900 dark:border-zinc-800",
                        )}
                    >
                        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden rounded-xl z-0">
                            <div className="dark:hidden">
                                <div className="absolute -top-10 -left-5 w-48 h-48 bg-gradient-radial from-purple-300/70 via-purple-300/40 to-transparent rounded-full blur-xl" />
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-gradient-radial from-teal-300/60 via-emerald-300/30 to-transparent rounded-full blur-xl" />
                                <div className="absolute -top-10 right-0 w-48 h-48 bg-gradient-radial from-pink-300/70 via-pink-300/40 to-transparent rounded-full blur-xl" />
                                <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-radial from-indigo-300/50 to-transparent rounded-full blur-xl" />
                                <div className="absolute top-20 right-1/4 w-36 h-36 bg-gradient-radial from-cyan-300/40 to-transparent rounded-full blur-xl" />
                            </div>
                            <div className="hidden dark:block">
                                <div className="absolute top-0 -left-5 w-44 h-44 bg-gradient-radial from-purple-400 to-transparent rounded-full blur-xl" />
                                <div className="absolute top-0 left-1/4 w-44 h-44 bg-gradient-radial from-violet-400 to-transparent rounded-full blur-xl" />
                                <div className="absolute -top-4 right-1/2 w-48 h-44 bg-gradient-radial from-pink-300 to-transparent rounded-full blur-xl" />
                                <div className="absolute top-4 right-1/4 w-40 h-36 bg-gradient-radial from-teal-300 to-transparent rounded-full blur-xl" />
                                <div className="absolute top-0 right-0 w-40 h-36 bg-gradient-radial from-green-300 to-transparent rounded-full blur-xl" />
                            </div>
                        </div>
                        <div className="mb-6 relative z-10">
                            <h3 className={cn("text-xl font-semibold mb-2", "text-slate-900 dark:text-white")}>Creator Plan</h3>
                            <div className="flex items-baseline">
                                <span className={cn("text-3xl font-bold", "text-slate-900 dark:text-white")}>$29.99</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                            </div>
                            <p className="text-muted-foreground mt-2 text-sm">Ideal for growing creators</p>
                        </div>
                        <button
                            className={cn(
                                "w-full py-2.5 px-4 rounded-full transition mb-6 relative z-10",
                                "bg-slate-900 hover:bg-slate-800 text-white",
                                "dark:bg-black dark:hover:bg-zinc-800 dark:text-white",
                            )}
                        >
                            Get Started
                        </button>
                        <div className="mt-2 relative z-10">
                            <p className={cn("text-xs uppercase font-semibold mb-4", "text-slate-500 dark:text-zinc-500")}>
                                FEATURES
                            </p>
                            <ul className="space-y-3">
                                <Feature>15 social media accounts</Feature>
                                <Feature>Everything in Essentials plan</Feature>
                                <Feature>Enhanced analytics with custom reports</Feature>
                                <Feature>Content Studio</Feature>
                                <Feature>Full AI content assistant (50 generations/month)</Feature>
                                <Feature>Advanced content studio with brand presets</Feature>
                                <Feature>Post recycling for evergreen content</Feature>
                                <Feature>Content categories and tagging</Feature>
                                <Feature>Team collaboration (3 users)</Feature>
                                <Feature>Hashtag performance tracking</Feature>
                                <Feature>Bulk scheduling and uploads</Feature>
                                <Feature>Priority email support</Feature>
                                <Feature>7-day free trial</Feature>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "rounded-xl shadow-lg p-6 flex flex-col",
                            "bg-white border border-slate-200",
                            "dark:bg-zinc-900 dark:border-zinc-800",
                        )}
                    >
                        <div className="mb-6">
                            <h3 className={cn("text-xl font-semibold mb-2", "text-slate-900 dark:text-white")}>Business Plan</h3>
                            <div className="flex items-baseline">
                                <span className={cn("text-3xl font-bold", "text-slate-900 dark:text-white")}>$59.99</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                            </div>
                            <p className="text-muted-foreground mt-2 text-sm">Built for growing businesses, and agencies</p>
                        </div>
                        <button
                            className={cn(
                                "w-full py-2.5 px-4 rounded-full transition mb-6",
                                "bg-slate-100 hover:bg-slate-200 text-slate-900",
                                "dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white",
                            )}
                        >
                            Get Started
                        </button>
                        <div className="mt-2">
                            <p className={cn("text-xs uppercase font-semibold mb-4", "text-slate-500 dark:text-zinc-500")}>
                                FEATURES
                            </p>
                            <ul className="space-y-3">
                                <Feature>30 social media accounts</Feature>
                                <Feature>Everything in Business plan</Feature>
                                <Feature>Unlimited team members</Feature>
                                <Feature>Unlimited AI content generations</Feature>
                                <Feature>Premium content studio with multi-brand assets</Feature>
                                <Feature>Client access portal with white labeling</Feature>
                                <Feature>Advanced approval workflows</Feature>
                                <Feature>Content library with asset management</Feature>
                                <Feature>AI-powered content strategy suggestions</Feature>
                                <Feature>Custom branded reports</Feature>
                                <Feature>API access</Feature>
                                <Feature>Real-time performance alerts</Feature>
                                <Feature>Dedicated account manager</Feature>
                                <Feature>Priority support with live chat</Feature>
                                <Feature>7-day free trial</Feature>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Feature({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start">
            <div className="mr-2 mt-0.5">
                <Check className="h-4 w-4 text-emerald-400" />
            </div>
            <span className={cn("text-sm", "text-slate-700 dark:text-zinc-300")}>{children}</span>
        </li>
    )
}
