"use client"

import type React from "react"
import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string
    email: string
    imageUrl?: string
    size?: number
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, email, imageUrl, size = 28, className, ...rest }) => {
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

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div style={{ width: size, height: size }} className={cn(className)} {...rest}>
                        <Avatar className="w-full h-full" aria-label={name || email}>
                            <AvatarImage src={imageUrl ?? fallbackUrl} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </div>
                </TooltipTrigger>
                {name && <TooltipContent>{name}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    )
}

export default UserAvatar
