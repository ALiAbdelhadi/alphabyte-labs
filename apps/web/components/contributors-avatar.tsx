"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"
import type React from "react"
import { useMemo } from "react"

interface ContributorsAvatarProps extends React.HTMLAttributes<HTMLAnchorElement> {
    name?: string
    email: string
    imageUrl?: string
    size?: number
    href: string
    role?: "core" | "contributor" | "guest"
}

export const ContributorsAvatar: React.FC<ContributorsAvatarProps> = ({
    name,
    email,
    imageUrl,
    size = 36,
    className,
    href,
    role = "contributor",
    ...rest
}) => {
    const fallbackUrl = useMemo(
        () => `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(email)}`,
        [email],
    )

    const initials = (name ?? email)
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]!.toUpperCase())
        .join("")

    // Apple-inspired role styling
    const getRoleStyle = () => {
        switch (role) {
            case "core":
                return "ring-2 ring-blue-500"
            case "guest":
                return "ring-1 ring-gray-200"
            default:
                return "ring-1 ring-gray-100"
        }
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name || email}
                        style={{ width: size, height: size }}
                        className={cn(
                            "relative inline-block transition-transform duration-300 ease-out",
                            "hover:scale-105 focus:scale-105",
                            "focus:outline-none",
                            className,
                        )}
                        {...rest}
                    >
                        <Avatar
                            className={cn(
                                "w-full h-full",
                                "bg-gray-50",
                                "shadow-sm",
                                getRoleStyle(),
                                "transition-all duration-300",
                                "hover:shadow-md",
                            )}
                        >
                            <AvatarImage src={imageUrl ?? fallbackUrl} alt={name || email} className="object-cover" />
                            <AvatarFallback className="text-sm font-medium text-gray-600 bg-gray-100">{initials}</AvatarFallback>
                        </Avatar>
                    </Link>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    align="center"
                    className="bg-white/90 backdrop-blur-sm border-none shadow-lg rounded-lg px-3 py-2"
                    sideOffset={4}
                >
                    <div className="text-sm font-medium text-gray-900">{name || email}</div>
                    {role && <div className="text-xs text-gray-500 capitalize">{role}</div>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ContributorsAvatar
