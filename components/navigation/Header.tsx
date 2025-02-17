"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Search from "@/components/navigation/search";
import { navItems } from "@/constant";
import { Separator } from "../ui/separator";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  return (
    <header
      className={cn(
        "sticky z-50 h-16 inset-[0%_0%_auto] top-0 w-full bg-white/40 backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] supports-[backdrop-filter]:bg-white/30 transition-all duration-300 ease-in-out",
      )}
    >
      <Container className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-6">
          <Logo showIcon={true} showLogoText={true} />
          <nav
            className={cn("hidden lg:flex items-center", {
              hidden: isOpen,
            })}
          >
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="hover:text-primary group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-[15px] font-medium transition-colors disabled:pointer-events-none text-[rgba(0,_0,_0,_.85)] hover:text-[#000000] -tracking-[.01em]">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Search />
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="outline">Sign In</Button>
            <Button className="bg-primary/90 hover:bg-primary text-primary-foreground">
              Get Started
            </Button>
          </div>
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div
                  className="z-50 w-[20px] flex flex-wrap flex-col justify-end mt-[5px] cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="bg-[#333] mb-[5px] h-[2px] w-full" />
                  <span className="bg-[#333] mb-[5px] h-[2px] w-full" />
                </div>
              </SheetTrigger>
              <SheetContent side="top" className="w-full h-full transition-all">
                <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col">
                  <ScrollArea className="relative h-[calc(100vh-4rem)] flex-1 overflow-auto">
                    <div className="flex justify-between">
                      <div className="transition-all w-full mt-7">
                        <div className="space-y-2">
                          {navItems.map((item) => (
                            <SheetClose
                              asChild
                              key={item.title}
                              className={"flex"}
                            >
                              <Link
                                href={item.href}
                                className="block transition-colors text-lg font-bold text-[#333336] hover:text-[#000000] tracking-[.007em]"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                          <Separator className="!mt-[13px] mx-0 !mb-[20px]" />
                          <div className="space-y-4">
                            <Button variant="outline" className="w-full">
                              Sign In
                            </Button>
                            <Button className="w-full">All Access</Button>
                          </div>
                        </div>
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
  );
}
