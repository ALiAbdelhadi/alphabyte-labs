"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import {
  Armchair,
  Bath,
  Bed,
  Crown,
  Facebook,
  Instagram,
  Layers,
  Mail,
  PanelLeftOpen,
  PanelRightOpen,
  Sparkles,
  Star,
  SwatchBook,
  TreePine,
  UtensilsCrossed,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  href: string
}

const SidebarItem = ({
  icon,
  label,
  isActive = false,
  href,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent text-muted-foreground"
      )}
    >
      <span className="w-5 h-5 text-current">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <div className="mt-6 px-4">
      <h3 className="text-xs font-semibold tracking-wider text-gray-300 dark:text-gray-500 mb-2">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true)
  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar((prevState) => !prevState)
  }, [])

  const sidebarVariants = {
    open: {
      width: 280,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {!isOpenSidebar && (
        <button
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="relative top-2 left-0 z-20 p-2 border-r border-border bg-background hover:bg-accent transition-colors flex items-center justify-center"
        >
          <PanelLeftOpen className="w-5 h-5 text-foreground" />
        </button>
      )}
      <motion.aside
        initial={isOpenSidebar ? "open" : "closed"}
        animate={isOpenSidebar ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "w-64 h-full border-r border-border sticky top-0 flex flex-col",
          isOpenSidebar ? "open" : "closed"
        )}
      >
        <div className="px-6 py-8 flex justify-between items-center border-b border-border">
          <h1 className="text-xl font-semibold uppercase">UniqueBrand</h1>
          {isOpenSidebar && (
            <button
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="p-1.5 rounded-md hover:bg-accent transition-colors"
            >
              <PanelRightOpen className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto hide-scrollbar">
          <SidebarSection title="">
            <SidebarItem
              icon={<Star size={18} />}
              label="Popular"
              isActive
              href="#"
            />
            <SidebarItem
              icon={<Sparkles size={18} />}
              label="New Collection"
              href="#"
            />
            <SidebarItem
              icon={<Armchair size={18} />}
              label="Custom Furniture"
              href="#"
            />
          </SidebarSection>
          <SidebarSection title="MATERIAL">
            <SidebarItem icon={<TreePine size={18} />} label="Wood" href="#" />
            <SidebarItem icon={<Layers size={18} />} label="Glass" href="#" />
            <SidebarItem
              icon={<SwatchBook size={18} />}
              label="Fabric"
              href="#"
            />
          </SidebarSection>
          <SidebarSection title="PACKAGE">
            <SidebarItem icon={<Crown size={18} />} label="Brand" href="#" />
            <SidebarItem icon={<Bed size={18} />} label="Bedroom" href="#" />
            <SidebarItem icon={<Bath size={18} />} label="Bathroom" href="#" />
            <SidebarItem
              icon={<UtensilsCrossed size={18} />}
              label="Kitchen Sets"
              href="#"
            />
          </SidebarSection>
          <SidebarSection title="CONTACT">
            <SidebarItem
              icon={<Facebook size={18} />}
              label="Facebook"
              href="#"
            />
            <SidebarItem
              icon={<Instagram size={18} />}
              label="Instagram"
              href="#"
            />
            <SidebarItem icon={<Mail size={18} />} label="Email" href="#" />
          </SidebarSection>
        </nav>
      </motion.aside>
    </>
  )
}
