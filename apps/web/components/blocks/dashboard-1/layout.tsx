"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./components/sidebar"

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative min-h-screen ">
            <Sidebar />
            <main className="transition-all duration-300">{children}</main>
        </div>
    )
}
