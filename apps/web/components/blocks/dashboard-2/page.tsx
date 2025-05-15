"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ArrowUpRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { formatPrice } from "../dashboard-3/lib/utils"
import { DashboardHeader } from "./components/dashboard-header"
import DashboardSidebar from "./components/dashboard-sidebar"
import { SectionCards } from "./components/section-cards"

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "April", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "June", sales: 6390 },
  { name: "July", sales: 3490 },
  { name: "Aug", sales: 9688 },
  { name: "Seb", sales: 2500 },
  { name: "Oct", sales: 7538 },
  { name: "Nov", sales: 1598 },
  { name: "Dec", sales: 7412 },
]
const salesChartOptions = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    textStyle: { color: "#111827", fontSize: 12 },
  },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: salesData.map((d) => d.name),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: "#d1d5db" } },
    axisLabel: {
      fontSize: 12,
      interval: (index: number, value: string) => {
        return window.innerWidth > 640 ? true : index % 2 === 0
      },
    },
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    splitLine: { lineStyle: { color: "#e5e7eb", type: "dashed" } },
    axisLabel: { fontSize: 12 },
  },
  series: [
    {
      data: salesData.map((d) => d.sales),
      type: "bar",
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: "#6366f1",
      },
      barWidth: "40%",
    },
  ],
  media: [
    {
      query: { maxWidth: 640 },
      option: {
        grid: { left: "8%", right: "8%" },
        xAxis: { axisLabel: { fontSize: 10, rotate: 45 } },
        yAxis: { axisLabel: { fontSize: 10 } },
      },
    },
  ],
}

const recentOrders = [
  {
    id: "ORD-7352",
    date: "2025-04-24",
    customer: "Emma Johnson",
    amount: 235.89,
    status: "Delivered",
  },
  {
    id: "ORD-7351",
    date: "2025-04-23",
    customer: "Michael Chen",
    amount: 125.99,
    status: "Processing",
  },
  {
    id: "ORD-7350",
    date: "2025-04-23",
    customer: "Sophia Martinez",
    amount: 432.2,
    status: "Shipped",
  },
  {
    id: "ORD-7349",
    date: "2025-04-22",
    customer: "James Wilson",
    amount: 76.45,
    status: "Delivered",
  },
  {
    id: "ORD-7348",
    date: "2025-04-21",
    customer: "Olivia Brown",
    amount: 189.5,
    status: "Processing",
  },
  {
    id: "ORD-7347",
    date: "2025-04-20",
    customer: "William Davis",
    amount: 312.75,
    status: "Delivered",
  },
  {
    id: "ORD-7346",
    date: "2025-04-19",
    customer: "Ava Garcia",
    amount: 94.2,
    status: "Shipped",
  },
]

export default function DashboardPage() {
  return (
    <SidebarProvider>
      {/* Here you can choose of custom sidebar behavior (inset, sidebar, floating)  default use: sidebar */}
      <DashboardSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col px-4 lg:px-6">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-3 py-3 md:gap-6 md:py-6">
              <SectionCards />
              <div className="grid gap-4 md:gap-6 grid-cols-1">
                <Card className="col-span-1 lg:col-span-8">
                  <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                    <CardTitle className="text-base md:text-lg">
                      Sales Overview
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Yearly sales performance for the last 12 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-0 md:pl-2 pt-0 pb-4">
                    <div className="h-[250px] md:h-[300px] lg:h-[400px] max-w-full">
                      <ReactECharts
                        option={salesChartOptions}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="px-3 md:px-6 py-2 md:py-4">
                  <CardTitle className="text-base md:text-lg">
                    Recent Orders
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Detailed view of the last 7 days order history
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-auto max-w-full custom-scrollbar">
                    <Table className="w-full min-w-[500px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs md:text-sm font-medium p-2 md:p-4">
                            Order ID
                          </TableHead>
                          <TableHead className="text-xs md:text-sm font-medium p-2 md:p-4">
                            Date
                          </TableHead>
                          <TableHead className="text-xs md:text-sm font-medium p-2 md:p-4">
                            Customer
                          </TableHead>
                          <TableHead className="text-xs md:text-sm font-medium p-2 md:p-4">
                            Status
                          </TableHead>
                          <TableHead className="text-xs md:text-sm font-medium text-right p-2 md:p-4">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="text-xs md:text-sm font-medium text-foreground p-2 md:p-4 text-nowrap">
                              {order.id}
                            </TableCell>
                            <TableCell className="text-xs md:text-sm text-muted-foreground p-2 md:p-4 text-nowrap">
                              {order.date}
                            </TableCell>
                            <TableCell className="text-xs md:text-sm p-2 md:p-4">
                              <div className="flex items-center gap-1 md:gap-2">
                                <Avatar className="h-6 w-6 md:h-8 md:w-8">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${order.customer}`}
                                    alt={order.customer}
                                  />
                                  <AvatarFallback>
                                    {order.customer.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-foreground text-nowrap line-clamp-1">
                                  {order.customer}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === "Delivered"
                                    ? "default"
                                    : order.status === "Processing"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : order.status === "Processing"
                                      ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs md:text-sm text-right text-foreground p-2 md:p-4">
                              {formatPrice(order.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end px-3 md:px-6 py-2 md:py-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-8 md:h-10 text-xs md:text-sm"
                  >
                    <Link href="/dashboard/orders">
                      View All Orders
                      <ArrowUpRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
