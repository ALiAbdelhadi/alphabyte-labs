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
         <div className={cn("lg:hidden fixed top-[64px] left-0 right-0 z-50 bg-white/10 backdrop-blur-lg backdrop-filter backdrop-saturate-[180%] transition-all duration-300")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <SheetTrigger asChild>
                  <div
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                     className="cursor-pointer border-b border-t border-gray-200 w-full py-3 flex items-center"
                  >
                     <ChevronRight />
                     <span className="font-semibold text-lg">Menu</span>
                  </div>
               </SheetTrigger>
            </div>
         </div>
         <SheetContent side="bottom" className="h-full">
            <div className="flex justify-between items-center p-4">
               <span className="font-semibold text-lg">Menu</span>
               <SheetClose>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setSidebarOpen(false)}
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </SheetClose>
            </div>
            <Separator />
            <div className="p-4">
               <ScrollArea className="h-[37.5rem] hide-scrollbar">
                  <DocsMenu isSheet />
               </ScrollArea>
            </div>
         </SheetContent>
      </Sheet>
   )
}


export default DocsNavigationOnMobile