'use client';

import {
   Drawer,
   DrawerContent,
   DrawerTrigger,
   DrawerClose,
   DrawerHeader,
   DrawerFooter,
   DrawerTitle,
   DrawerDescription,
} from "@/components/library/drawer";

export default function DrawerDemo() {
   return (
      <Drawer>
         <DrawerTrigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
            Open Drawer
         </DrawerTrigger>
         <DrawerContent>
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
               <DrawerHeader>
                  <DrawerTitle className="font-medium mb-4 text-gray-900">Drawer for React.</DrawerTitle>
                  <DrawerDescription>
                     <p className="text-gray-600 mb-2">
                        This component can be used as a Dialog replacement on mobile and tablet devices.
                        You can read about why and how it was built{' '}
                        <a target="_blank" className="underline" href="https://emilkowal.ski/ui/building-a-drawer-component">
                           here
                        </a>.
                     </p>
                     <p className="text-gray-600 mb-2">
                        This one specifically is the most simplest setup you can have, just a simple drawer with a trigger.
                     </p>
                  </DrawerDescription>
               </DrawerHeader>
            </div>
            <DrawerFooter className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
               <div className="flex gap-6 justify-end max-w-md mx-auto">
                  <a
                     className="text-xs text-gray-600 flex items-center gap-0.25"
                     href="https://github.com/emilkowalski/vaul"
                     target="_blank"
                  >
                     GitHub
                     <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        aria-hidden="true"
                        className="w-3 h-3 ml-1"
                     >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                     </svg>
                  </a>
                  <a
                     className="text-xs text-gray-600 flex items-center gap-0.25"
                     href="https://twitter.com/emilkowalski_"
                     target="_blank"
                  >
                     Twitter
                     <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        aria-hidden="true"
                        className="w-3 h-3 ml-1"
                     >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                     </svg>
                  </a>
               </div>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}