"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, Mail, Star } from "lucide-react"

interface PersonalCardProps {
    name?: string
    bio?: string
    profileImage?: string
    isVerified?: boolean
    rating?: number
    earned?: string
    rate?: string
    onGetInTouch?: () => void
    onBookmark?: () => void
}

export default function PersonalCard1({
    name = "Sophie Bennett",
    bio = "A Product Designer focused on intuitive user experiences..",
    profileImage = "/blocks/personal-card-1/personal-card-1.jpg",
    isVerified = true,
    rating = 4.8,
    earned = "$45k+",
    rate = "$50/hr",
    onGetInTouch,
    onBookmark,
}: PersonalCardProps) {
    return (
        <Card className="w-full max-w-xs mx-auto shadow-lg rounded-3xl">
            <CardContent className="p-3">
                <div className="relative mb-3">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-200 via-green-200 to-yellow-200 w-full h-[250px]">
                        <img src={profileImage || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-black/10 hover:bg-black/20 text-white backdrop-blur-[2px] rounded-full h-8 w-8"
                        onClick={onBookmark}
                    >
                        <Bookmark className="h-4 w-4" strokeWidth={2.5} />
                    </Button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-foreground">{name}</h2>
                    {isVerified && (
                        <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-600 hover:bg-blue-100 p-0 h-4 w-4 rounded-full flex items-center justify-center"
                        >
                            <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 20 20">
                                <path d="M10 0L12.09 6.26L18 4.27L15.64 10L18 15.73L12.09 13.74L10 20L7.91 13.74L2 15.73L4.36 10L2 4.27L7.91 6.26L10 0Z" />
                            </svg>
                        </Badge>
                    )}
                </div>
                <p className="text-muted-foreground text-sm font-normal mb-3 leading-relaxed">{bio}</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center border-r border-border">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                            <span className="font-semibold text-foreground text-sm">{rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center border-r border-border">
                        <p className="font-semibold text-foreground mb-1 text-sm">{earned}</p>
                        <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-foreground mb-1 text-sm">{rate}</p>
                        <p className="text-xs text-muted-foreground">Rate</p>
                    </div>
                </div>
                <Button
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-2.5 text-sm"
                    onClick={onGetInTouch}
                >
                    <Mail className="h-4 w-4 mr-2" />
                    Get In Touch
                </Button>
            </CardContent>
        </Card>
    )
}