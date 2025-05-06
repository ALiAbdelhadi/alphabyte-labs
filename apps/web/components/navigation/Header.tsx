"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/constant"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Container from "@/components/Container"
import { ScrollArea } from "@/components/library/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/library/sheet"
import Logo from "@/components/Logo"
import Search from "@/components/navigation/search"

import ChangeTheme from "../ChangeTheme"
import { Button } from "../library/button"
import { Separator } from "../library/separator"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const routeName = usePathname()
  const isDocsRoute = routeName.includes("/docs")
  const listRef = useRef(null)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <header
      className={cn(
        "sticky z-50 h-14  inset-0 top-0 w-full transition-all",
        "bg-[hsla(0,0%,100%,.7)] dark:bg-[#d5dae003]",
        "backdrop-blur-lg backdrop-filter backdrop-saturate-[200%]",
        isDocsRoute && "lg:border-b border-dashed"
      )}
    >
      <Container
        className={cn(
          "h-full flex items-center justify-between transition-all",
          isDocsRoute && "lg:border-r lg:border-l border-border border-dashed"
        )}
      >
        <div className="flex items-center gap-4">
          <Logo showLogoText={true} className="flex-shrink-0" />
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="md:space-x-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      passHref
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center",
                        "rounded-md bg-transparent p-2 text-sm",
                        "transition-colors -tracking-[.01em]",
                        "text-[rgba(0,0,0,0.8)] dark:text-[rgba(255,255,255,.80)]",
                        "hover:text-[#000000] dark:hover:text-white"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Search />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="lg:block hidden rounded-full text-xs"
              size={"sm"}
            >
              Get Full Access
            </Button>
            <ChangeTheme />
          </div>
          <div className="flex items-center gap-2 md:hidden w-full">
            <Search />
            <ChangeTheme />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div
                  className="z-50 w-[20px] flex flex-wrap flex-col justify-end mt-[5px] cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="bg-[#000] dark:bg-[#FFF] mb-[5px] h-[2.2px] w-full" />
                  <span className="bg-[#000] dark:bg-[#FFF] mb-[5px] h-[2.2px] w-full" />
                </div>
              </SheetTrigger>
              <SheetContent side="top" className="w-full h-full transition-all">
                <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col">
                  <ScrollArea className="relative h-[calc(100vh-4rem)] flex-1 overflow-auto">
                    <div className="flex justify-between">
                      <div className="transition-all w-full mt-7">
                        <AnimatePresence>
                          {isOpen && (
                            <motion.ul
                              className="space-y-2"
                              ref={listRef}
                              variants={containerVariants}
                              initial="hidden"
                              animate="show"
                            >
                              {navItems.map((item, index) => (
                                <motion.li
                                  key={item.title}
                                  variants={itemVariants}
                                  custom={index}
                                >
                                  <SheetClose asChild className={"flex"}>
                                    <Link
                                      href={item.href}
                                      className="block transition-colors text-lg font-bold text-[#333336] dark:text-gray-100 dark:hover:text-gray-50 hover:text-[#000000] tracking-[.007em]"
                                    >
                                      {item.title}
                                    </Link>
                                  </SheetClose>
                                </motion.li>
                              ))}
                              <motion.div variants={itemVariants}>
                                <Separator className="!mt-[13px] mx-0 !mb-[20px]" />
                              </motion.div>
                              <motion.div
                                className="space-y-4"
                                variants={itemVariants}
                              >
                                <Button variant="outline" className="w-full">
                                  Sign In
                                </Button>
                                <Button className="w-full">
                                  Get full access
                                </Button>
                              </motion.div>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </ScrollArea>
                  <SheetClose className="absolute right-5 top-5">
                    <X className="h-[26px] w-[26px]" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
