"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useSubmenuState } from "@/hooks/use-submenu-state"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface MenuItem {
  id: string
  title: string
  items?: MenuItem[]
}

interface CardSidenavProps {
  items: MenuItem[]
}

export function FolderTreeMenu({ items }: CardSidenavProps) {
  const { openStates, toggleSubmenu } = useSubmenuState()

  const renderMenuItem = (item: MenuItem) => {
    const hasSubItems = item.items && item.items.length > 0
    const isOpen = openStates[item.id]

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          onClick={() => hasSubItems && toggleSubmenu(item.id)}
          className={cn(
            "w-full justify-between",
            hasSubItems && "font-semibold"
          )}
        >
          {item.title}
          {hasSubItems && (
            <span className="ml-auto">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
        </SidebarMenuButton>
        {hasSubItems && (
          <SidebarMenuSub>
            {isOpen &&
              item.items!.map((subItem) => (
                <SidebarMenuSubItem key={subItem.id}>
                  <SidebarMenuSubButton>{subItem.title}</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar className="w-64 rounded-xl border bg-card text-card-foreground shadow-sm">
      <SidebarHeader className="px-4 py-2">
        <h2 className="text-lg font-semibold">Menu</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>{items.map(renderMenuItem)}</SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
