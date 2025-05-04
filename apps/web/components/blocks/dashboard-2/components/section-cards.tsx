import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/library/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/library/card"

import { formatPrice } from "../lib/utils"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm ">
        <CardHeader className="relative px-3 py-3 md:px-4 md:py-4">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-semibold tabular-nums text-green-600">
            {formatPrice(85637)}
          </CardTitle>
          <div className="absolute right-3 top-3 md:right-4 md:top-4">
            <Badge
              variant="outline"
              className="flex flex-row gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm px-3 py-2 md:px-4 md:py-3">
          <div className="line-clamp-1 flex gap-1 md:gap-2 font-medium">
            Trending up this month{" "}
            <TrendingUpIcon className="size-3 md:size-4" />
          </div>
          <div className="text-muted-foreground text-xs md:text-sm">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm ">
        <CardHeader className="relative px-3 py-3 md:px-4 md:py-4">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-semibold tabular-nums">
            1,234
          </CardTitle>
          <div className="absolute right-3 top-3 md:right-4 md:top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-destructive"
            >
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm px-3 py-2 md:px-4 md:py-3">
          <div className="line-clamp-1 flex gap-1 md:gap-2 font-medium">
            Down 20% this period{" "}
            <TrendingDownIcon className="size-3 md:size-4" />
          </div>
          <div className="text-muted-foreground text-xs md:text-sm">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm">
        <CardHeader className="relative px-3 py-3 md:px-4 md:py-4">
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-semibold tabular-nums">
            45,678
          </CardTitle>
          <div className="absolute right-3 top-3 md:right-4 md:top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm px-3 py-2 md:px-4 md:py-3">
          <div className="line-clamp-1 flex gap-1 md:gap-2 font-medium">
            Strong user retention{" "}
            <TrendingUpIcon className="size-3 md:size-4" />
          </div>
          <div className="text-muted-foreground text-xs md:text-sm">
            Engagement exceed targets
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm">
        <CardHeader className="relative px-3 py-3 md:px-4 md:py-4">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl font-semibold tabular-nums">
            4.5%
          </CardTitle>
          <div className="absolute right-3 top-3 md:right-4 md:top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-green-600"
            >
              <TrendingUpIcon className="size-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm px-3 py-2 md:px-4 md:py-3">
          <div className="line-clamp-1 flex gap-1 md:gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-3 md:size-4" />
          </div>
          <div className="text-muted-foreground text-xs md:text-sm">
            Meets growth projections
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
