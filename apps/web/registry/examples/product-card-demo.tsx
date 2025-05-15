"use client"

import { useState } from "react"
import { Truck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function ProductCardDemo() {
  const [isDetailsClicked, setIsDetailsClicked] = useState(false)
  return (
    <div className="select-none max-w-[300px] relative">
      <div className="absolute top-[3%] -left-[3%] z-10 px-[5px] py-[7px] flex items-center justify-center gap-2 text-background text-xs rounded-tl-[0] rounded-br-[5px] rounded-tr-[5px] rounded-bl-[0] bg-[#676769] dark:bg-[#dad4d4]">
        <Truck className="w-4 h-4" />
        Fast shipping
      </div>
      <div className="absolute right-[0px] z-10  flex items-center justify-center text-background text-xs">
        <Badge className="rounded-none text-sm" variant={"destructive"}>
          20%
        </Badge>
      </div>
      <div className="p-0">
        <div className="relative">
          <img
            src="/JY-BO-001-650MM-8W (1).png"
            alt="LED Chandelier"
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="text-[19px] mt-[10px] font-medium">PRODUCT-MC6015-H3</p>
          <h3 className=" leading-tight text-zinc-500">
            Aluminum Shade + Glass LED Chandelier With E27 Base & 36W
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-red-500">EGP 2576.00</span>
            <span className="text-sm text-zinc-400 line-through">
              EGP 3219.00
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-[10px]">
        <button
          className={cn("flex-1 border border-black py-2 px-2 rounded-md", {
            "bg-gray-100": isDetailsClicked,
          })}
          onClick={() => setIsDetailsClicked(true)}
        >
          More details
        </button>
        <button className="shrink-0 bg-black rounded-md py-1 px-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width={20}
            height={20}
            fill="white"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
