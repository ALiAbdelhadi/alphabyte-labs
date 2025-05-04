"use client"

import * as React from "react"
import { arSA } from "date-fns/locale"

import { Calendar } from "@/components/library/calendar"

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
