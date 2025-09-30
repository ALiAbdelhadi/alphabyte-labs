"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import type { SidebarItem } from "@/types"
import { ChevronRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import DocsMenu from "./docs-sidebar"

export function DocsNavigationOnMobile({ config = [] }: { config?: SidebarItem[] }) {
  const [open, setOpen] = useState(false)
  const t = useTranslations("docs-navigation-on-mobile")
  return (
    <>
      <div
        className={cn(
          "md:hidden sticky top-14 left-0 z-10 h-14 border-b border-t border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <Drawer
            shouldScaleBackground={true}
            open={open}
            onOpenChange={setOpen}
          >
            <DrawerTrigger asChild>
              <button className="cursor-pointer w-full flex items-center gap-2.5 py-2">
                <ChevronRight className="w-5 h-5 rtl:rotate-180 text-muted-foreground" />
                <DrawerTitle className="font-medium text-sm text-foreground/90">
                  {t("menu")}
                </DrawerTitle>
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[70svh] px-4 rounded-t-3xl">
              <div>
                <div className="flex justify-between items-center py-4">
                  <span className="font-semibold text-base">{t("menu")}</span>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
                <Separator />
                <ScrollArea className="h-[25rem] hide-scrollbar py-2">
                  <DocsMenu isSheet config={config} />
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  )
}

export default DocsNavigationOnMobile
