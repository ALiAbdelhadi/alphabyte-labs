"use client"

import { useState } from "react"
import { ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import DocsMenu from "./docs-sidebar"

export function DocsNavigationOnMobile() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          "md:hidden z-50 h-14 fixed top-[56px] border-b border-t border-gray-300 left-0 right-0 bg-[rgba(250,250,252,0.4)] dark:bg-[#e2e8f003] backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] transition-all duration-300"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <Drawer
            shouldScaleBackground={true}
            open={open}
            onOpenChange={setOpen}
          >
            <DrawerTrigger asChild>
              <div className="cursor-pointer w-full flex items-center mb-0.5">
                <ChevronRight />
                <DrawerTitle className="font-semibold text-lg">
                  Menu
                </DrawerTitle>
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-[70svh] px-4 rounded-t-3xl ">
              <div>
                <div className="flex justify-between items-center py-4">
                  <span className="font-semibold text-lg">Menu</span>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="!h-5 !w-5" />
                    </Button>
                  </DrawerClose>
                </div>
                <Separator />
                <ScrollArea className="h-[25rem] hide-scrollbar">
                  <DocsMenu isSheet />
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
