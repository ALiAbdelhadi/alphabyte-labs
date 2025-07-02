"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BadgeCheck, UserPlus, Users } from "lucide-react"
import Image from "next/image"

export default function PersonalCard() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="space-y-6">
                <Card
                    className={cn(
                        "w-[19rem] h-[457px] rounded-3xl overflow-hidden relative border-4 border-border",
                        "bg-white/10 backdrop-blur-lg",
                    )}
                    style={{ height: "457px" }}
                >
                    <div className="relative h-full w-full">
                        <Image
                            src="/blocks/personal-card-1/personal-card-1.jpg"
                            alt="Sophie Bennett"
                            fill
                            className="object-cover object-center"
                            priority
                            quality={100}
                        />
                        <div
                            className={cn(
                                "absolute inset-0",
                                "bg-gradient-to-t from-white/20 via-white/5 to-transparent",
                                "dark:bg-gradient-to-t dark:from-black/60 dark:via-black/20 dark:to-transparent"
                            )}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-10">
                        <div
                            className="absolute h-full bottom-0 left-0 right-0 backdrop-blur-md"
                            style={{
                                maskImage:
                                    "linear-gradient(to top, rgba(0,0,0,2) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)",
                                WebkitMaskImage:
                                    "linear-gradient(to top, rgba(0,0,0,2) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)",
                            }}
                        />
                        <div
                            className={cn(
                                "absolute h-full bottom-0 left-0 right-0",
                                "bg-gradient-to-t from-white/60 via-white/20 to-transparent",
                                "dark:bg-gradient-to-t dark:from-black/90 dark:via-black/40 dark:to-transparent"
                            )}
                        />
                        <div className="relative z-10 p-[1.2rem] space-y-2">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-white dark:text-foreground">
                                    Sophie Bennett
                                </h2>
                                <div className="flex-shrink-0">
                                    <BadgeCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                            <p className="text-base leading-relaxed text-white dark:text-foreground">
                                A Product Designer focused on intuitive user experiences.
                            </p>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-white dark:text-foreground">
                                        <Users className="h-5 w-5" />
                                        <span className="font-semibold text-white dark:text-foreground">
                                            312
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white dark:text-foreground">
                                        <UserPlus className="h-4 w-4" />
                                        <span className="font-semibold text-white dark:text-foreground">
                                            48
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className={cn(
                                        "rounded-full px-6 py-2 font-semibold flex items-center justify-center border border-border",
                                        "bg-[hsla(0,0%,100%,.1)] dark:bg-[#d5dae003] backdrop-blur-sm text-white dark:text-foreground"
                                    )}
                                >
                                    Follow +
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}