"use client"

import { Calendar } from "@/registry/ui/calendar"
import * as React from "react"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
