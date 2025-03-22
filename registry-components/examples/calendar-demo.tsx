"use client"

import { Calendar } from "@/components/library/calendar"
import * as React from "react"

export default function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
        />
    )
}
