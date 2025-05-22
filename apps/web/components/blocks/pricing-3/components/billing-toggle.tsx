"use client"

import { cn } from "@/lib/utils"

interface BillingToggleProps {
    billingCycle: "monthly" | "annual"
    setBillingCycle: (value: "monthly" | "annual") => void
    discount: number
}

export function BillingToggle({ billingCycle, setBillingCycle, discount }: BillingToggleProps) {
    return (
        <div className="inline-flex rounded-full bg-purple-50 dark:bg-purple-950/20 p-1">
            <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    billingCycle === "monthly"
                        ? "bg-white dark:bg-gray-950 text-gray-950 dark:text-white shadow-sm"
                        : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                )}
            >
                Monthly
            </button>
            <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    billingCycle === "annual"
                        ? "bg-purple-600 dark:bg-purple-500 text-white shadow-sm"
                        : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                )}
            >
                Annual (Save {discount}%)
            </button>
        </div>
    )
}
