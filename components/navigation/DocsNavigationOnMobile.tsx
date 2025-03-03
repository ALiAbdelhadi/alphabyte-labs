"use client"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import DocsMenu from "./DocsMenu";
export function DocsNavigationOnMobile() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   return (
      <Sheet>
         {/* Fixed Mobile Trigger */}
         <div className={cn("lg:hidden h-14 fixed top-[56px]  left-0 right-0 z-50 bg-[rgba(250,250,252,0.4)] dark:bg-[#e2e8f003] backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] transition-all duration-300")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-t border-gray-300">
               <SheetTrigger asChild>
                  <div
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                     className="cursor-pointer w-full pt-3 flex items-center pb-3.5"
                  >
                     <ChevronRight />
                     <span className="font-semibold text-lg">Menu</span>
                  </div>
               </SheetTrigger>
            </div>
         </div>
         <SheetContent side="bottom" className="h-4/6 py-2 px-4 rounded-[13px_13px_0_0]">
            <div className="flex justify-between items-center py-4">
               <span className="font-semibold text-lg">Menu</span>
               <SheetClose>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setSidebarOpen(false)}
                  >
                     <X className="!h-5 !w-5" />
                  </Button>
               </SheetClose>
            </div>
            <Separator />
            <ScrollArea className="h-[22.5rem] hide-scrollbar">
               <DocsMenu isSheet />
            </ScrollArea>
         </SheetContent>
      </Sheet>
   )
}


export default DocsNavigationOnMobile