"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon strokeWidth={2.1} absoluteStrokeWidth />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="font-normal">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
