"use client"

import { cn } from "@/lib/utils"

interface BillingToggleProps {
    billingCycle: "monthly" | "annual"
    setBillingCycle: (value: "monthly" | "annual") => void
    discount: number
}

export function BillingToggle({ billingCycle, setBillingCycle, discount }: BillingToggleProps) {
    return (
        <div className="inline-flex rounded-full bg-purple-50 p-1">
            <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    billingCycle === "monthly"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "bg-transparent text-gray-600 hover:text-gray-900",
                )}
            >
                Monthly
            </button>
            <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    billingCycle === "annual"
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-transparent text-gray-600 hover:text-gray-900",
                )}
            >
                Annual (Save {discount}%)
            </button>
        </div>
    )
}
