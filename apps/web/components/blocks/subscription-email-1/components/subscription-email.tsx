"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SubscriptionEmailProps {
    className?: string
    headline?: string
    subheadline?: string
    buttonText?: string
    successMessage?: string
}

export default function SubscriptionEmail({
    className,
    headline = "Exclusive Early Access",
    subheadline = "Be the first to shop our limited collections and receive personalized style recommendations",
    buttonText = "Subscribe",
    successMessage = "You're on the list",
}: SubscriptionEmailProps) {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setIsValid(false)
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <div
            className={cn(
                "w-full max-w-3xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800",
                className,
            )}
        >
            <div className="px-8 py-12 md:px-12 md:py-16 relative overflow-hidden">
                {/* Abstract background element */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-full opacity-50 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 dark:bg-neutral-100">
                            <Mail className="w-5 h-5 text-neutral-100 dark:text-neutral-900" />
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight">
                        {headline}
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-lg">{subheadline}</p>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setIsValid(true)
                                    }}
                                    className={cn(
                                        "h-14 px-5 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
                                        !isValid && "border-red-300 dark:border-red-700 focus-visible:ring-red-400",
                                    )}
                                />
                                {!isValid && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-2">Please enter a valid email address</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !email}
                                className="h-14 px-6 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 transition-all duration-200 shadow-sm hover:shadow-md w-full md:w-auto"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent dark:border-neutral-900 dark:border-t-transparent rounded-full animate-spin"></span>
                                        Processing
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {buttonText}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-3 text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 py-4 px-5 rounded-xl">
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="font-medium">{successMessage}</span>
                        </div>
                    )}
                    <p className="text-muted-foreground text-xs mt-6">
                        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                </div>
            </div>
        </div>
    )
}
