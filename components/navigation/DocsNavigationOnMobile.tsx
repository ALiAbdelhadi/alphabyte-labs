"use client"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import DocsMenu from "./DocsMenu";
import { Button } from "../library/button";

export function DocsNavigationOnMobile() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const modalRef = useRef<HTMLDivElement>(null);
   const dragHandleRef = useRef<HTMLSpanElement>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [startY, setStartY] = useState(0);
   const [translateY, setTranslateY] = useState(0);

   const handleTouchStart = (event: React.TouchEvent) => {
      if (event.target === dragHandleRef.current) {
         setIsDragging(true);
         setStartY(event.touches[0].clientY);
      }
   };

   const handleTouchMove = (event: React.TouchEvent) => {
      if (!isDragging || !modalRef.current) return;

      const currentY = event.touches[0].clientY;
      const deltaY = currentY - startY;

      if (deltaY > 0) {
         event.preventDefault();
         setTranslateY(deltaY);
         requestAnimationFrame(() => {
            modalRef.current!.style.transform = `translateY(${deltaY}px)`;
            modalRef.current!.style.opacity = `${1 - deltaY / (window.innerHeight / 2)}`;
         });
      }
   };

   const handleTouchEnd = () => {
      if (!isDragging || !modalRef.current) return;
      setIsDragging(false);

      if (translateY > window.innerHeight * 0.25) {
         setSidebarOpen(false);
      } else {
         modalRef.current.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
         modalRef.current.style.transform = "translateY(0px)";
         modalRef.current.style.opacity = "1";
         setTimeout(() => {
            modalRef.current!.style.transition = "";
         }, 300);
      }

      setTranslateY(0);
   };

   return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
         <div className={cn("md:hidden h-14 fixed top-[56px] border-b border-t border-gray-300 left-0 right-0 z-50 bg-[rgba(250,250,252,0.4)] dark:bg-[#e2e8f003] backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] transition-all duration-300")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
               <SheetTrigger asChild>
                  <div
                     onClick={() => setSidebarOpen(true)}
                     className="cursor-pointer w-full flex items-center mb-0.5"
                  >
                     <ChevronRight />
                     <span className="font-semibold text-lg">Menu</span>
                  </div>
               </SheetTrigger>
            </div>
         </div>
         <SheetContent
            ref={modalRef}
            side="bottom"
            className="h-4/6 py-2 px-4 rounded-[13px_13px_0_0] will-change-transform"
            style={{ transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.5s ease-out' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            <div>
               <span
                  ref={dragHandleRef}
                  className="w-20 h-1 bg-gray-300 rounded-full flex justify-center mx-auto cursor-grab active:cursor-grabbing"
               />
               <div className="flex justify-between items-center py-4">
                  <span className="font-semibold text-lg">Menu</span>
                  <SheetClose>
                     <Button
                        data-close-sheet
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
            </div>
         </SheetContent>
      </Sheet>
   )
}

export default DocsNavigationOnMobile;
