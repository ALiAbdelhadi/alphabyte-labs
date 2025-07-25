"use client"

import Container from "@/components/Container"
import Logo from "@/components/Logo"
import Search from "@/components/navigation/search"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/constant"
import { cn } from "@/lib/utils"
import { GitHubLink } from "@/settings/settings"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import ChangeTheme from "../ChangeTheme"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

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
              asChild
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Link
                href={GitHubLink.href}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 438.549 438.549" className="!w-5 !h-5">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  ></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
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
