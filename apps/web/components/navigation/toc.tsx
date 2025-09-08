"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "@/i18n/navigation"
import clsx from "clsx"

import { ScrollArea } from "@/components/ui/scroll-area"
import TocCtaCard from "../toc-cta-card"
import { ContributorsComponents } from "@/constant"
import UserAvatar from "../user-avatar"
import { useTranslations } from "next-intl"

type TocProps = {
  tocs: { href: string; level: number; text: string }[]
}

export default function Toc({ tocs }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20px 0px -20px 0px",
      threshold: 0.1,
    })

    tocs.forEach((item) => {
      const element = document.getElementById(item.href.slice(1))
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [tocs])

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    const id = href.startsWith("#") ? href.slice(1) : href
    const targetElement = document.getElementById(id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  if (!tocs.length) {
    return null
  }

  const getLinkClassName = (level: number, isActive: boolean) =>
    clsx("transition-colors duration-200 hover:text-primary", {
      "pl-0": level === 2,
      "pl-4 rtl:pr-4": level === 3,
      "pl-8 rtl:pr-8": level === 4,
      "font-semibold text-primary -ml-[1px] rtl:-mr-[1px]": isActive,
    })
  const t = useTranslations("toc")
  return (
    <div className="flex flex-col gap-3 w-full not-prose transition-all max-w-[230px]">
      <h3 className="text-sm font-semibold">{t("this-page")}</h3>
      <nav className="flex flex-col text-gray-500 dark:text-gray-400 ml-0.5 rtl:mr-0.5 text-left rtl:text-right">
        <ScrollArea className="max-h-[12rem]">
          <ul className="space-y-[6px]">
            {tocs.map(({ href, level, text }, index) => (
              <li className="text-sm" key={index}>
                <Link
                  href={href}
                  scroll={false}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  className={getLinkClassName(level, activeId === href.slice(1))}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-4">
          <TocCtaCard />
        </div>
      </nav>
    </div>
  )
}
