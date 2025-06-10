"use client"

import { Calendar } from "@/registry/ui/calendar"
import { arSA } from "date-fns/locale"
import * as React from "react"

const convertToArabicDigits = (num: number): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w])
}

export default function CalendarArabicDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const formatters = {
    formatDay: (day: Date) => convertToArabicDigits(day.getDate()),
  }

  return (
    <Calendar
      locale={arSA}
      dir="rtl"
      mode="single"
      selected={date}
      onSelect={setDate}
      formatters={formatters}
    />
  )
}
