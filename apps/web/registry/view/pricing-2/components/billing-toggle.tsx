"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface BillingToggleProps {
    billingCycle: "monthly" | "yearly"
    setBillingCycle: (value: "monthly" | "yearly") => void
}

export function BillingToggle({ billingCycle, setBillingCycle }: BillingToggleProps) {
    return (
        <div className="flex items-center justify-center space-x-4">
            <Label
                htmlFor="billing-toggle"
                className={`cursor-pointer text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
                    }`}
            >
                Monthly
            </Label>
            <Switch
                id="billing-toggle"
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                className="data-[state=checked]:bg-primary"
            />
            <Label
                htmlFor="billing-toggle"
                className={`cursor-pointer text-sm font-medium ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"
                    }`}
            >
                Yearly
            </Label>
        </div>
    )
}
