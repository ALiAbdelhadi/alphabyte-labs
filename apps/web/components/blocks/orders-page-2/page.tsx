"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ArrowUpDown, Download, Eye, Filter, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useState } from "react"
import DashboardSidebar from "../dashboard-2/components/dashboard-sidebar"
import { OrdersHeader } from "./components/orders-header"
import { formatPrice } from "./lib/utils"

const orders = [
    {
        id: "ORD-7352",
        date: "2025-04-24",
        customer: "Emma Johnson",
        email: "emma.j@example.com",
        amount: 235.89,
        status: "Delivered",
        items: 3,
    },
    {
        id: "ORD-7351",
        date: "2025-04-23",
        customer: "Michael Chen",
        email: "michael.c@example.com",
        amount: 125.99,
        status: "Processing",
        items: 2,
    },
    {
        id: "ORD-7350",
        date: "2025-04-23",
        customer: "Sophia Martinez",
        email: "sophia.m@example.com",
        amount: 432.20,
        status: "Shipped",
        items: 5,
    },
    {
        id: "ORD-7349",
        date: "2025-04-22",
        customer: "James Wilson",
        email: "james.w@example.com",
        amount: 76.45,
        status: "Delivered",
        items: 1,
    },
    {
        id: "ORD-7348",
        date: "2025-04-21",
        customer: "Olivia Brown",
        email: "olivia.b@example.com",
        amount: 189.50,
        status: "Processing",
        items: 3,
    },
    {
        id: "ORD-7347",
        date: "2025-04-20",
        customer: "William Davis",
        email: "william.d@example.com",
        amount: 312.75,
        status: "Delivered",
        items: 4,
    },
    {
        id: "ORD-7346",
        date: "2025-04-19",
        customer: "Ava Garcia",
        email: "ava.g@example.com",
        amount: 94.20,
        status: "Shipped",
        items: 2,
    },
    {
        id: "ORD-7345",
        date: "2025-04-18",
        customer: "Noah Rodriguez",
        email: "noah.r@example.com",
        amount: 156.30,
        status: "Delivered",
        items: 3,
    },
    {
        id: "ORD-7344",
        date: "2025-04-17",
        customer: "Isabella Lopez",
        email: "isabella.l@example.com",
        amount: 210.45,
        status: "Processing",
        items: 2,
    },
    {
        id: "ORD-7343",
        date: "2025-04-16",
        customer: "Liam Gonzalez",
        email: "liam.g@example.com",
        amount: 178.90,
        status: "Shipped",
        items: 3,
    },
]

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
        let matchesDate = true
        if (dateFilter === "today") {
            matchesDate = order.date === "2025-04-24"
        } else if (dateFilter === "yesterday") {
            matchesDate = order.date === "2025-04-23"
        } else if (dateFilter === "week") {

            matchesDate = true
        }

        return matchesSearch && matchesStatus && matchesDate
    })

    return (
        <SidebarProvider>
            <DashboardSidebar variant="inset" />
            <SidebarInset>
                <OrdersHeader />
                <div className="flex flex-1 flex-col px-4 lg:px-6">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-3 py-3 md:gap-6 md:py-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Orders Management</h1>
                                    <p className="mt-1 text-muted-foreground">View and manage all customer orders</p>
                                </div>
                            </div>
                            <Card className="overflow-hidden border-border shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                        <div className="flex-1 md:max-w-md">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    type="search"
                                                    placeholder="Search by order ID, customer name or email..."
                                                    className="pl-10 bg-background"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                <SelectTrigger className="w-[180px] bg-background">
                                                    <SelectValue placeholder="Filter by status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="processing">Processing</SelectItem>
                                                    <SelectItem value="shipped">Shipped</SelectItem>
                                                    <SelectItem value="delivered">Delivered</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                                <SelectTrigger className="w-[180px] bg-background">
                                                    <SelectValue placeholder="Filter by date" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Dates</SelectItem>
                                                    <SelectItem value="today">Today</SelectItem>
                                                    <SelectItem value="yesterday">Yesterday</SelectItem>
                                                    <SelectItem value="week">This Week</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                                                <Filter className="h-4 w-4" />
                                                <span className="sr-only">More filters</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="overflow-hidden border-border shadow-sm">
                                <CardHeader className="bg-muted/40 px-6 py-5 border-b border-border">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
                                            <CardDescription className="mt-1">
                                                Showing {filteredOrders.length} of {orders.length} total orders
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Filter className="mr-2 h-3.5 w-3.5" />
                                                Filter
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-3.5 w-3.5" />
                                                Export
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-muted/30">
                                                <TableRow className="hover:bg-muted/20">
                                                    <TableHead className="w-[100px] font-medium">
                                                        <Button variant="ghost" className="hover:bg-transparent font-medium">
                                                            Order ID
                                                            <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead className="font-medium">
                                                        <Button variant="ghost" className=" hover:bg-transparent font-medium">
                                                            Date
                                                            <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead className="font-medium">Customer</TableHead>
                                                    <TableHead className="font-medium">Items</TableHead>
                                                    <TableHead className="font-medium">
                                                        <Button variant="ghost" className=" hover:bg-transparent font-medium">
                                                            Status
                                                            <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead className="text-right font-medium">
                                                        <Button variant="ghost" className=" hover:bg-transparent font-medium">
                                                            Amount
                                                            <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead className="w-[50px]"></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredOrders.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="h-24 text-center">
                                                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                                <Search className="h-8 w-8 mb-2 opacity-50" />
                                                                <p>No orders found matching your criteria.</p>
                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => {
                                                                        setSearchTerm("")
                                                                        setStatusFilter("all")
                                                                        setDateFilter("all")
                                                                    }}
                                                                >
                                                                    Clear all filters
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredOrders.map((order) => (
                                                        <TableRow key={order.id} className="hover:bg-muted/20">
                                                            <TableCell className="font-medium py-2 px-6">{order.id}</TableCell>
                                                            <TableCell className="py-2 px-6 text-nowrap">{order.date}</TableCell>
                                                            <TableCell className="py-2 px-6">
                                                                <div>
                                                                    <div className="font-medium">{order.customer}</div>
                                                                    <div className="text-sm text-muted-foreground">{order.email}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-2 px-6">
                                                                <Badge variant="outline" className="bg-background text-nowrap">
                                                                    {order.items} items
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="py-2 px-6">
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
                                                            <TableCell className="text-right font-medium py-2 px-6">{formatPrice(order?.amount)}</TableCell>
                                                            <TableCell className="py-2 px-6">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                            <span className="sr-only">Open menu</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end" className="w-[180px]">
                                                                        <DropdownMenuItem asChild>
                                                                            <Link href={`/dashboard/orders/${order.id}`} className="flex items-center">
                                                                                <Eye className="mr-2 h-4 w-4" />
                                                                                View details
                                                                            </Link>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="flex items-center">
                                                                            <Download className="mr-2 h-4 w-4" />
                                                                            Download invoice
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-destructive flex items-center">
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete order
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
