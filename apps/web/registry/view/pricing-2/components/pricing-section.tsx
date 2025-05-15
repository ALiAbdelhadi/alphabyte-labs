"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BillingToggle } from "./billing-toggle"
import { cn } from "@/lib/utils"

const plans = [
    {
        name: "Free",
        description: "For individuals just getting started",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "1 user",
            "5 projects",
            "Up to 1GB storage",
            "Basic support",
            { name: "Limited API access", tooltip: "Up to 100 requests per day" },
            { name: "Community access", tooltip: "Access to our community forums" },
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        description: "For professionals and small teams",
        monthlyPrice: 15,
        yearlyPrice: 144,
        features: [
            "Up to 5 users",
            "20 projects",
            "Up to 10GB storage",
            "Priority support",
            { name: "Advanced API access", tooltip: "Up to 10,000 requests per day" },
            { name: "Team collaboration", tooltip: "Real-time collaboration features" },
            "Custom domains",
        ],
        cta: "Subscribe",
        popular: true,
    },
    {
        name: "Premium",
        description: "For growing teams with advanced needs",
        monthlyPrice: 30,
        yearlyPrice: 288,
        features: [
            "Up to 10 users",
            "Unlimited projects",
            "Up to 100GB storage",
            "24/7 phone support",
            { name: "Enterprise API access", tooltip: "Unlimited API requests" },
            { name: "Advanced analytics", tooltip: "Detailed usage and performance metrics" },
            "Custom domains",
            "SSO authentication",
        ],
        cta: "Subscribe",
        popular: false,
    },
    {
        name: "Enterprise",
        description: "For large organizations with custom requirements",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
            "Unlimited users",
            "Unlimited projects",
            "Unlimited storage",
            "Dedicated support team",
            { name: "Custom API solutions", tooltip: "Tailored API solutions for your needs" },
            { name: "Advanced security", tooltip: "Enhanced security features and compliance" },
            "Custom domains",
            "SSO authentication",
            "Dedicated infrastructure",
            "Custom integrations",
        ],
        cta: "Contact Sales",
        popular: false,
    },
]

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

    const yearlyDiscount = 20 

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Choose the perfect plan for your needs. Always know what you'll pay.
                        </p>
                    </div>
                    <div className="w-full max-w-sm">
                        <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
                    </div>
                    {billingCycle === "yearly" && (
                        <div className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <span>Save {yearlyDiscount}% with yearly billing</span>
                        </div>
                    )}
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan) => {
                        const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
                        const priceDisplay = price === null ? "Custom pricing" : `$${price}`
                        const interval = billingCycle === "monthly" ? "/month" : "/year"
                        return (
                            <Card
                                key={plan.name}
                                className={cn(
                                    "flex flex-col transition-all duration-200 hover:shadow-lg rounded-2xl",
                                    plan.popular ? "border-primary shadow-md dark:border-primary dark:bg-primary/5" : "border-border",
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        Popular
                                    </div>
                                )}
                                <CardHeader className={cn("flex flex-col space-y-1.5", plan.popular && "pt-10")}>
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 min-h-[40px]">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6 flex items-baseline text-foreground">
                                        <span className="text-4xl font-bold">{priceDisplay}</span>
                                        {price !== null && <span className="ml-1 text-sm text-muted-foreground">{interval}</span>}
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                                                <span className="text-sm">
                                                    {typeof feature === "string" ? (
                                                        feature
                                                    ) : (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger className="flex items-center text-left">
                                                                    {feature.name}
                                                                    <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-xs">
                                                                    <p>{feature.tooltip}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className={cn(
                                            "w-full rounded-full transition-all",
                                            plan.popular ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground",
                                        )}
                                        variant={plan.popular ? "default" : "outline"}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
                </div>
            </div>
        </section>
    )
}
