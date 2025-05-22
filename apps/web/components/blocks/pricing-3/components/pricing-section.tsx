"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'
import { useState } from "react"
import { BillingToggle } from "./billing-toggle"

const plans = [
    {
        name: "Creator",
        description: "Unlock powerful AI tools to create your content, wherever you work online.",
        monthlyPrice: 19,
        annualPrice: 9.5,
        features: [
            "01 User Access",
            "Access to Fixoria AI Chatbot",
            "Access to SEO Mode",
            "AI Image Generation and editing Tool",
            "03 Brand Voice Access",
            "Use AI with Browser Extension",
        ],
        cta: "Current Plan",
        ctaVariant: "outline" as const,
        popular: false,
        trial: "Start Free 7-Days Trial",
    },
    {
        name: "Pro Plan",
        description: "Leverage advanced AI to create content for multiple brands on campaigns.",
        monthlyPrice: 99,
        annualPrice: 49.5,
        features: [
            "05 User Access",
            "10 Knowledge Assets",
            "Access to Pro SEO Mode",
            "Collaboration with our Management",
            "10 Brand Voice Access",
            "01 Page Custom change Access",
        ],
        cta: "Switch to this Plan",
        ctaVariant: "default" as const,
        popular: true,
        trial: "Start Free 7-Days Trial",
        billingNote: "Per user, per month & billed annually",
    },
    {
        name: "Business Plan",
        description: "Personalized AI with enhanced control, security, team training, and tech support.",
        monthlyPrice: 199,
        annualPrice: 99.5,
        features: [
            "Unlimited Feature Usage",
            "Performance Analytics & Insights",
            "Custom Style Guides with New View",
            "Advanced Admin Panel Access",
            "Group Document Collaboration",
            "Hight Security Platform",
        ],
        cta: "Contact Sales",
        ctaVariant: "default" as const,
        popular: false,
        trial: "Start Free 15-Days Trial",
        customPricing: true,
    },
]

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
    const discount = 50

    return (
        <section className="w-full py-12">
            <div className="container px-4 md:px-6 max-w-6xl">
                <div className="flex flex-col items-start space-y-4 pb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Upgrade Plan</h2>
                        <p className="text-gray-500 dark:text-gray-400">Fixoria pricing plan are designed to meet your needs as you grow</p>
                    </div>
                    <div className="mt-6">
                        <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} discount={discount} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice
                        return (
                            <Card
                                key={plan.name}
                                className={cn(
                                    "relative overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-md",
                                    "border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none",
                                    plan.popular
                                        ? "border-purple-100 dark:border-purple-900/50 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-black"
                                        : "dark:bg-black"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute right-4 top-4 flex items-center rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="mr-1 h-3 w-3"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Popular
                                    </div>
                                )}
                                <CardHeader className={cn("pb-8 pt-6", plan.popular && "pt-10")}>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">{plan.name}</CardTitle>
                                    <CardDescription className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-6">
                                    <div className="mb-5">
                                        {plan.customPricing ? (
                                            <div>
                                                <div className="flex items-baseline">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Start from</span>
                                                    <span className="ml-1.5 text-4xl font-bold text-gray-900 dark:text-gray-50">${price}</span>
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Custom Pricing, Custom Billing</div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-baseline">
                                                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-50">${price}</span>
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.billingNote || `Per user & per month`}</div>
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant={plan.ctaVariant}
                                        className={cn(
                                            "w-full rounded-lg py-2.5 text-sm font-medium",
                                            plan.ctaVariant === "default" &&
                                            "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 shadow-sm dark:from-purple-600 dark:to-purple-800 dark:hover:from-purple-500 dark:hover:to-purple-700",
                                            plan.ctaVariant === "outline" &&
                                            "border-gray-200 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {plan.cta}
                                    </Button>
                                    <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">{plan.trial}</div>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start border-t border-gray-100 dark:border-gray-800 px-6 py-5">
                                    <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">Features</h4>
                                    <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                        {plan.name === "Creator"
                                            ? "Everything in our free plan includes"
                                            : plan.name === "Pro Plan"
                                                ? "Everything in Creator & Plus"
                                                : "Everything in Creator, Plus & Business"}
                                    </p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                                    <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
