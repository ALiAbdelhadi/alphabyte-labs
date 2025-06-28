"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { DASHBOARDS } from "../constant/index"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all")
    const pathname = usePathname()


    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const sidebarVariants = {
        open: {
            width: 280,
            opacity: 1,
            display: "block",
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        closed: {
            width: 0,
            opacity: 0,
            display: "none",
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    const contentVariants = {
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        closed: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <>
            <motion.aside
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen w-[280px]",
                    "bg-white/10 backdrop-blur-md border-r border-white/20 shadow-xl",
                    "dark:bg-black/20 dark:border-white/10 dark:shadow-black/30",
                    className,
                )}
            >
                <motion.div variants={contentVariants} className="flex h-full flex-col w-[280px]">
                    <div className="flex items-center justify-between p-6 border-b border-border/30">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-primary-foreground font-semibold text-sm">A</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground tracking-tight">Admin Panel</h2>
                                <p className="text-xs text-muted-foreground/80">Ecommerce Dashboard</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 overflow-hidden">
                        <div className="p-4">
                            <div className="mb-6">
                                <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-3 px-3">
                                    Main Menu
                                </p>
                            </div>
                            <ScrollArea className="h-[calc(100vh-280px)]" onWheel={(e) => e.stopPropagation()}>
                                <div className="space-y-1 pr-4">
                                    {DASHBOARDS.map((item) => {
                                        const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.url}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                                                    "hover:bg-accent/50 hover:shadow-sm",
                                                    {
                                                        "bg-primary/10 text-primary shadow-sm border border-primary/20": isActive,
                                                        "text-foreground/80 hover:text-foreground": !isActive,
                                                    },
                                                )}
                                            >
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                                                )}
                                                <div
                                                    className={cn("flex items-center justify-center w-5 h-5 transition-all duration-200", {
                                                        "text-primary": isActive,
                                                        "text-muted-foreground group-hover:text-foreground": !isActive,
                                                    })}
                                                >
                                                    {item.icon}
                                                </div>
                                                <span className="font-medium text-sm tracking-tight">{item.name}</span>
                                                {item.badge && (
                                                    <span className="ml-auto bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full font-medium border border-destructive/20">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </nav>
                    <div className="p-4 border-t border-border/30 shadow-md">
                        <div className="bg-accent/30 rounded-xl p-4 border border-border/20 shadow-inner">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                    <span className="text-primary-foreground font-semibold text-sm">JD</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate tracking-tight">John Doe</p>
                                    <p className="text-xs text-muted-foreground/80 truncate">john@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.aside>
            <Button
                onClick={toggleSidebar}
                size="sm"
                className={cn(
                    "fixed top-4 z-50 rounded-r-xl bg-background/95 hover:bg-accent border border-border/50 text-foreground transition-all duration-300 shadow-lg shadow-black/5 backdrop-blur-sm",
                    "dark:bg-background/90 dark:hover:bg-accent/80 dark:shadow-black/20",
                    {
                        "left-[280px]": isOpen,
                        "left-0": !isOpen,
                    },
                )}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-30 bg-background/20 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}
