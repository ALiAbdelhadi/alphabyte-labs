"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/library/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/library/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/library/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
    { date: "2024-04-01", completed: 42, pending: 15, shipped: 25, processing: 18, cancelled: 5 },
    { date: "2024-04-02", completed: 37, pending: 18, shipped: 22, processing: 15, cancelled: 3 },
    { date: "2024-04-03", completed: 45, pending: 12, shipped: 28, processing: 20, cancelled: 4 },
    { date: "2024-04-04", completed: 52, pending: 26, shipped: 30, processing: 22, cancelled: 6 },
    { date: "2024-04-05", completed: 63, pending: 29, shipped: 35, processing: 25, cancelled: 8 },
    { date: "2024-04-06", completed: 71, pending: 34, shipped: 40, processing: 30, cancelled: 7 },
    { date: "2024-04-07", completed: 55, pending: 18, shipped: 32, processing: 24, cancelled: 5 },
    { date: "2024-04-08", completed: 69, pending: 32, shipped: 38, processing: 28, cancelled: 9 },
    { date: "2024-04-09", completed: 39, pending: 11, shipped: 25, processing: 18, cancelled: 4 },
    { date: "2024-04-10", completed: 51, pending: 19, shipped: 30, processing: 22, cancelled: 6 },
    { date: "2024-04-11", completed: 67, pending: 35, shipped: 36, processing: 27, cancelled: 8 },
    { date: "2024-04-12", completed: 52, pending: 21, shipped: 31, processing: 23, cancelled: 5 },
    { date: "2024-04-13", completed: 72, pending: 38, shipped: 40, processing: 30, cancelled: 9 },
    { date: "2024-04-14", completed: 47, pending: 22, shipped: 28, processing: 21, cancelled: 6 },
    { date: "2024-04-15", completed: 40, pending: 17, shipped: 25, processing: 19, cancelled: 4 },
    { date: "2024-04-16", completed: 48, pending: 19, shipped: 29, processing: 22, cancelled: 5 },
    { date: "2024-04-17", completed: 76, pending: 36, shipped: 42, processing: 32, cancelled: 10 },
    { date: "2024-04-18", completed: 74, pending: 41, shipped: 40, processing: 30, cancelled: 9 },
    { date: "2024-04-19", completed: 53, pending: 18, shipped: 32, processing: 24, cancelled: 6 },
    { date: "2024-04-20", completed: 39, pending: 15, shipped: 24, processing: 18, cancelled: 4 },
    { date: "2024-04-21", completed: 47, pending: 20, shipped: 28, processing: 21, cancelled: 5 },
    { date: "2024-04-22", completed: 54, pending: 17, shipped: 32, processing: 24, cancelled: 6 },
    { date: "2024-04-23", completed: 48, pending: 23, shipped: 29, processing: 22, cancelled: 5 },
    { date: "2024-04-24", completed: 67, pending: 29, shipped: 38, processing: 28, cancelled: 8 },
    { date: "2024-04-25", completed: 55, pending: 25, shipped: 33, processing: 25, cancelled: 7 },
    { date: "2024-04-26", completed: 35, pending: 13, shipped: 22, processing: 16, cancelled: 4 },
    { date: "2024-04-27", completed: 83, pending: 42, shipped: 45, processing: 34, cancelled: 10 },
    { date: "2024-04-28", completed: 42, pending: 18, shipped: 26, processing: 19, cancelled: 5 },
    { date: "2024-04-29", completed: 65, pending: 24, shipped: 37, processing: 28, cancelled: 8 },
    { date: "2024-04-30", completed: 84, pending: 38, shipped: 46, processing: 35, cancelled: 11 },
    { date: "2024-05-01", completed: 55, pending: 22, shipped: 33, processing: 25, cancelled: 6 },
    { date: "2024-05-02", completed: 63, pending: 31, shipped: 36, processing: 27, cancelled: 8 },
    { date: "2024-05-03", completed: 57, pending: 19, shipped: 34, processing: 25, cancelled: 7 },
    { date: "2024-05-04", completed: 85, pending: 42, shipped: 47, processing: 35, cancelled: 10 },
    { date: "2024-05-05", completed: 91, pending: 39, shipped: 50, processing: 38, cancelled: 12 },
    { date: "2024-05-06", completed: 98, pending: 52, shipped: 54, processing: 40, cancelled: 13 },
    { date: "2024-05-07", completed: 78, pending: 30, shipped: 43, processing: 32, cancelled: 10 },
    { date: "2024-05-08", completed: 49, pending: 21, shipped: 30, processing: 22, cancelled: 6 },
    { date: "2024-05-09", completed: 57, pending: 18, shipped: 34, processing: 25, cancelled: 7 },
    { date: "2024-05-10", completed: 63, pending: 33, shipped: 36, processing: 27, cancelled: 8 },
    { date: "2024-05-11", completed: 75, pending: 27, shipped: 42, processing: 31, cancelled: 9 },
    { date: "2024-05-12", completed: 57, pending: 24, shipped: 34, processing: 25, cancelled: 7 },
    { date: "2024-05-13", completed: 57, pending: 16, shipped: 34, processing: 25, cancelled: 7 },
    { date: "2024-05-14", completed: 88, pending: 49, shipped: 48, processing: 36, cancelled: 11 },
    { date: "2024-05-15", completed: 93, pending: 38, shipped: 51, processing: 38, cancelled: 12 },
    { date: "2024-05-16", completed: 78, pending: 40, shipped: 43, processing: 32, cancelled: 10 },
    { date: "2024-05-17", completed: 99, pending: 42, shipped: 54, processing: 41, cancelled: 13 },
    { date: "2024-05-18", completed: 75, pending: 35, shipped: 42, processing: 31, cancelled: 9 },
    { date: "2024-05-19", completed: 55, pending: 18, shipped: 33, processing: 25, cancelled: 7 },
    { date: "2024-05-20", completed: 57, pending: 23, shipped: 34, processing: 25, cancelled: 7 },
    { date: "2024-05-21", completed: 32, pending: 14, shipped: 20, processing: 15, cancelled: 4 },
    { date: "2024-05-22", completed: 31, pending: 12, shipped: 19, processing: 14, cancelled: 4 },
    { date: "2024-05-23", completed: 62, pending: 29, shipped: 35, processing: 26, cancelled: 8 },
    { date: "2024-05-24", completed: 64, pending: 22, shipped: 36, processing: 27, cancelled: 8 },
    { date: "2024-05-25", completed: 61, pending: 25, shipped: 35, processing: 26, cancelled: 8 },
    { date: "2024-05-26", completed: 53, pending: 17, shipped: 32, processing: 24, cancelled: 7 },
    { date: "2024-05-27", completed: 90, pending: 46, shipped: 49, processing: 37, cancelled: 11 },
    { date: "2024-05-28", completed: 53, pending: 19, shipped: 32, processing: 24, cancelled: 7 },
    { date: "2024-05-29", completed: 38, pending: 13, shipped: 23, processing: 17, cancelled: 5 },
    { date: "2024-05-30", completed: 70, pending: 28, shipped: 39, processing: 29, cancelled: 9 },
    { date: "2024-05-31", completed: 58, pending: 23, shipped: 34, processing: 26, cancelled: 7 },
    { date: "2024-06-01", completed: 58, pending: 20, shipped: 34, processing: 26, cancelled: 7 },
    { date: "2024-06-02", completed: 90, pending: 41, shipped: 49, processing: 37, cancelled: 11 },
    { date: "2024-06-03", completed: 43, pending: 16, shipped: 26, processing: 20, cancelled: 5 },
    { date: "2024-06-04", completed: 89, pending: 38, shipped: 49, processing: 37, cancelled: 11 },
    { date: "2024-06-05", completed: 38, pending: 14, shipped: 23, processing: 17, cancelled: 5 },
    { date: "2024-06-06", completed: 64, pending: 25, shipped: 36, processing: 27, cancelled: 8 },
    { date: "2024-06-07", completed: 73, pending: 37, shipped: 40, processing: 30, cancelled: 9 },
    { date: "2024-06-08", completed: 85, pending: 32, shipped: 47, processing: 35, cancelled: 11 },
    { date: "2024-06-09", completed: 98, pending: 48, shipped: 54, processing: 40, cancelled: 12 },
    { date: "2024-06-10", completed: 55, pending: 20, shipped: 33, processing: 25, cancelled: 7 },
    { date: "2024-06-11", completed: 42, pending: 15, shipped: 26, processing: 19, cancelled: 5 },
    { date: "2024-06-12", completed: 92, pending: 42, shipped: 50, processing: 38, cancelled: 12 },
    { date: "2024-06-13", completed: 41, pending: 13, shipped: 25, processing: 19, cancelled: 5 },
    { date: "2024-06-14", completed: 86, pending: 38, shipped: 47, processing: 35, cancelled: 11 },
    { date: "2024-06-15", completed: 67, pending: 35, shipped: 38, processing: 28, cancelled: 8 },
    { date: "2024-06-16", completed: 71, pending: 31, shipped: 40, processing: 30, cancelled: 9 },
    { date: "2024-06-17", completed: 95, pending: 52, shipped: 52, processing: 39, cancelled: 12 },
    { date: "2024-06-18", completed: 47, pending: 17, shipped: 29, processing: 21, cancelled: 6 },
    { date: "2024-06-19", completed: 71, pending: 29, shipped: 40, processing: 30, cancelled: 9 },
    { date: "2024-06-20", completed: 88, pending: 45, shipped: 48, processing: 36, cancelled: 11 },
    { date: "2024-06-21", completed: 59, pending: 21, shipped: 35, processing: 26, cancelled: 7 },
    { date: "2024-06-22", completed: 67, pending: 27, shipped: 38, processing: 28, cancelled: 8 },
    { date: "2024-06-23", completed: 100, pending: 53, shipped: 55, processing: 41, cancelled: 13 },
    { date: "2024-06-24", completed: 52, pending: 18, shipped: 31, processing: 23, cancelled: 6 },
    { date: "2024-06-25", completed: 51, pending: 19, shipped: 31, processing: 23, cancelled: 6 },
    { date: "2024-06-26", completed: 84, pending: 38, shipped: 46, processing: 35, cancelled: 10 },
    { date: "2024-06-27", completed: 88, pending: 49, shipped: 48, processing: 36, cancelled: 11 },
    { date: "2024-06-28", completed: 49, pending: 20, shipped: 30, processing: 22, cancelled: 6 },
    { date: "2024-06-29", completed: 43, pending: 16, shipped: 26, processing: 20, cancelled: 5 },
    { date: "2024-06-30", completed: 86, pending: 40, shipped: 47, processing: 35, cancelled: 11 },
]

const chartConfig = {
    orders: {
        label: "Orders",
    },
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    shipped: {
        label: "Shipped",
        color: "hsl(var(--chart-3))",
    },
    processing: {
        label: "Processing",
        color: "hsl(var(--chart-4))",
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-2))",
    },
    cancelled: {
        label: "Cancelled",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function OrdersChart() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("30d")

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>
                    <span className="@[540px]/card:block hidden">Order status breakdown over time</span>
                    <span className="@[540px]/card:hidden">Order status over time</span>
                </CardDescription>
                <div className="absolute right-4 top-4">
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="@[767px]/card:flex hidden"
                    >
                        <ToggleGroupItem value="90d" className="h-8 px-2.5">
                            Last 3 months
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d" className="h-8 px-2.5">
                            Last 30 days
                        </ToggleGroupItem>
                        <ToggleGroupItem value="7d" className="h-8 px-2.5">
                            Last 7 days
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a time range">
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={1.0} />
                                <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillShipped" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-shipped)" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="var(--color-shipped)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillProcessing" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-processing)" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="var(--color-processing)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-pending)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-pending)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-cancelled)" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="var(--color-cancelled)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="cancelled"
                            type="natural"
                            fill="url(#fillCancelled)"
                            stroke="var(--color-cancelled)"
                            stackId="a"
                        />
                        <Area dataKey="pending" type="natural" fill="url(#fillPending)" stroke="var(--color-pending)" stackId="a" />
                        <Area
                            dataKey="processing"
                            type="natural"
                            fill="url(#fillProcessing)"
                            stroke="var(--color-processing)"
                            stackId="a"
                        />
                        <Area dataKey="shipped" type="natural" fill="url(#fillShipped)" stroke="var(--color-shipped)" stackId="a" />
                        <Area
                            dataKey="completed"
                            type="natural"
                            fill="url(#fillCompleted)"
                            stroke="var(--color-completed)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
