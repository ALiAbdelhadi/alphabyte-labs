"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { DASHBOARDS } from "../constant/index"

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const sidebarVariants = {
        open: {
            width: 280,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        closed: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    }

    const contentVariants = {
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                delay: 0.1,
            },
        },
        closed: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.2,
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
                    "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 shadow-lg overflow-hidden",
                    className,
                )}
            >
                <motion.div variants={contentVariants} className="flex h-full flex-col w-[280px]">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                                <p className="text-xs text-gray-500">Ecommerce Dashboard</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main Menu</p>
                        </div>
                        {DASHBOARDS.map((item) => {
                            const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group", {
                                        "bg-blue-50 text-blue-700 border border-blue-200": isActive,
                                        "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
                                    })}
                                >
                                    <div
                                        className={cn("flex items-center justify-center w-5 h-5 transition-colors", {
                                            "text-blue-600": isActive,
                                            "text-gray-400 group-hover:text-gray-600": !isActive,
                                        })}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="font-medium text-sm">{item.name}</span>
                                    {item.badge && (
                                        <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="p-4 border-t border-gray-100">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">JD</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                                    <p className="text-xs text-gray-500 truncate">john@example.com</p>
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
                    "fixed top-4 z-50 rounded-r-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg",
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
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}
