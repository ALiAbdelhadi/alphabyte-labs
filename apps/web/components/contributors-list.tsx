"use client"

import type React from "react"
import ContributorsAvatar from "./contributors-avatar"

interface Contributor {
    id: string
    name: string
    email: string
    imageUrl?: string
    href: string
    role: "core" | "contributor" | "guest"
}

interface ContributorsListProps {
    contributors: Contributor[]
    maxDisplay?: number
    size?: number
}

export const ContributorsList: React.FC<ContributorsListProps> = ({ contributors, maxDisplay = 5, size = 36 }) => {
    const displayedContributors = contributors.slice(0, maxDisplay)
    const remainingCount = Math.max(0, contributors.length - maxDisplay)

    return (
        <div className="flex items-center">
            <div className="flex -space-x-2">
                {displayedContributors.map((contributor) => (
                    <ContributorsAvatar
                        key={contributor.id}
                        name={contributor.name}
                        email={contributor.email}
                        imageUrl={contributor.imageUrl}
                        href={contributor.href}
                        role={contributor.role}
                        size={size}
                        className="hover:z-10"
                    />
                ))}
            </div>
            {remainingCount > 0 && (
                <div
                    className="flex items-center justify-center -ml-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full ring-1 ring-gray-100"
                    style={{ width: size, height: size }}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    )
}

export default ContributorsList
