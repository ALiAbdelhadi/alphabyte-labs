"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Bell,
    DollarSign,
    Filter,
    MoreHorizontal,
    Package,
    Search,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react"
import { useMemo, useState } from "react"
import { formatDate, formatPrice } from "../lib/utils"
import { Sidebar } from "./sidebar"

type OrderStatus = "awaiting_shipment" | "processing" | "fulfilled" | "cancelled"

interface Order {
    id: number
    customerName: string
    customerEmail: string
    customerAvatar: string
    productName: string
    productImage: string
    productPrice: number
    quantity: number
    shippingPrice: number
    discountRate: number
    totalPrice: number
    status: OrderStatus
    createdAt: string
}

const mockOrders: Order[] = [
    {
        id: 1001,
        customerName: "Ahmed Hassan",
        customerEmail: "ahmed.hassan@email.com",
        customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        productName: "iPhone 15 Pro Max",
        productImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
        productPrice: 1199,
        quantity: 1,
        shippingPrice: 25,
        discountRate: 0.1,
        totalPrice: 1104.1,
        status: "fulfilled",
        createdAt: "2024-01-15T10:30:00Z",
    },
    {
        id: 1002,
        customerName: "Fatima Al-Zahra",
        customerEmail: "fatima.zahra@email.com",
        customerAvatar: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop&crop=face",
        productName: "MacBook Air M3",
        productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        productPrice: 1299,
        quantity: 1,
        shippingPrice: 0,
        discountRate: 0,
        totalPrice: 1299,
        status: "processing",
        createdAt: "2024-01-14T14:20:00Z",
    },
    {
        id: 1003,
        customerName: "Omar Khaled",
        customerEmail: "omar.khaled@email.com",
        customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        productName: "AirPods Pro 2",
        productImage: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop",
        productPrice: 249,
        quantity: 2,
        shippingPrice: 15,
        discountRate: 0.05,
        totalPrice: 487.1,
        status: "awaiting_shipment",
        createdAt: "2024-01-14T09:15:00Z",
    },
    {
        id: 1004,
        customerName: "Layla Mohammed",
        customerEmail: "layla.mohammed@email.com",
        customerAvatar: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop&crop=face",
        productName: "iPad Pro 12.9",
        productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
        productPrice: 1099,
        quantity: 1,
        shippingPrice: 20,
        discountRate: 0.15,
        totalPrice: 954.15,
        status: "cancelled",
        createdAt: "2024-01-13T16:45:00Z",
    },
    {
        id: 1005,
        customerName: "Youssef Ali",
        customerEmail: "youssef.ali@email.com",
        customerAvatar: "",
        productName: "Apple Watch Series 9",
        productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        productPrice: 399,
        quantity: 1,
        shippingPrice: 10,
        discountRate: 0,
        totalPrice: 409,
        status: "fulfilled",
        createdAt: "2024-01-13T11:30:00Z",
    },
    {
        id: 1006,
        customerName: "Nour Abdel Rahman",
        customerEmail: "nour.abdel@email.com",
        customerAvatar: "",
        productName: "Magic Keyboard",
        productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        productPrice: 299,
        quantity: 1,
        shippingPrice: 12,
        discountRate: 0.08,
        totalPrice: 286.08,
        status: "processing",
        createdAt: "2024-01-12T13:20:00Z",
    },
]

const getStatusBadgeClassName = (status: OrderStatus) => {
    switch (status) {
        case "cancelled":
            return "bg-red-500 text-white hover:bg-red-600"
        case "processing":
            return "bg-yellow-500 text-white hover:bg-yellow-600"
        case "fulfilled":
            return "bg-green-500 text-white hover:bg-green-600"
        case "awaiting_shipment":
            return "bg-blue-500 text-white hover:bg-blue-600"
        default:
            return "bg-gray-500 text-white hover:bg-gray-600"
    }
}

const LABEL_MAP: Record<OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shipment",
    processing: "Processing",
    cancelled: "Cancelled",
    fulfilled: "Fulfilled",
}

function DashboardHeader() {
    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4 lg:px-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Package className="h-6 w-6 text-blue-600" />
                        <h1 className="text-xl font-semibold">E-commerce Admin</h1>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

function DashboardSummary({ orders }: { orders: Order[] }) {
    const stats = useMemo(() => {
        const totalSales = orders
            .filter((order) => order.status !== "cancelled")
            .reduce((sum, order) => sum + order.totalPrice, 0)

        const totalOrders = orders.length
        const totalCustomers = new Set(orders.map((order) => order.customerEmail)).size
        const avgOrderValue = totalSales / Math.max(totalOrders, 1)

        return {
            totalSales,
            totalOrders,
            totalCustomers,
            avgOrderValue,
        }
    }, [orders])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.totalSales)}</div>
                    <p className="text-xs text-muted-foreground">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +12.5% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +8.2% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +5.1% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.avgOrderValue)}</div>
                    <p className="text-xs text-muted-foreground">
                        <TrendingDown className="inline h-3 w-3 mr-1" />
                        -2.1% from last month
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default function Dashboard() {
    const [filter, setFilter] = useState<string>("all")

    const filteredOrders = useMemo(() => {
        if (filter === "all") return mockOrders
        return mockOrders.filter((order) => order.status === filter)
    }, [filter])

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price * (1 - discount)
    }

    const calculateTotal = (order: Order) => {
        const discountedPrice = calculateDiscountedPrice(order.productPrice, order.discountRate)
        return discountedPrice * order.quantity + order.shippingPrice
    }

    return (
        <>
            <Sidebar />
            <div className="min-h-screen">
                <DashboardHeader />
                <div className="flex flex-col gap-6 p-4 lg:p-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
                    </div>
                    <DashboardSummary orders={mockOrders} />
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Recent Orders</h3>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                        <Tabs value={filter} onValueChange={setFilter} className="w-full">
                            <TabsList className="max-w-fit">
                                <TabsTrigger value="all">All Orders</TabsTrigger>
                                <TabsTrigger value="awaiting_shipment">Awaiting</TabsTrigger>
                                <TabsTrigger value="processing">Processing</TabsTrigger>
                                <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
                                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Card>
                            <CardHeader>
                                <CardTitle>Orders</CardTitle>
                                <CardDescription>Manage your orders and view their status.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Order</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Discount</TableHead>
                                                <TableHead>Qty</TableHead>
                                                <TableHead>Shipping</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">#{order.id}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src={order.customerAvatar || "/placeholder.svg"} />
                                                                <AvatarFallback>
                                                                    {order.customerName
                                                                        .split(" ")
                                                                        .map((n) => n[0])
                                                                        .join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{order.customerName}</div>
                                                                <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={order.productImage || "/placeholder.svg"}
                                                                alt={order.productName}
                                                                className="h-10 w-10 rounded object-cover"
                                                            />
                                                            <div className="font-medium text-nowrap">{order.productName}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.discountRate > 0 ? (
                                                            <div className="space-y-1">
                                                                <div className="line-through text-sm text-muted-foreground">
                                                                    {formatPrice(order.productPrice)}
                                                                </div>
                                                                <div className="font-medium">
                                                                    {formatPrice(calculateDiscountedPrice(order.productPrice, order.discountRate))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="font-medium">{formatPrice(order.productPrice)}</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-nowrap">
                                                        {order.discountRate > 0 ? (
                                                            <Badge variant="secondary">{Math.round(order.discountRate * 100)}% OFF</Badge>
                                                        ) : (
                                                            <span className="text-muted-foreground">No discount</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{order.quantity}</TableCell>
                                                    <TableCell>{order.shippingPrice > 0 ? formatPrice(order.shippingPrice) : "Free"}</TableCell>
                                                    <TableCell className="font-medium">{formatPrice(calculateTotal(order))}</TableCell>
                                                    <TableCell className="text-nowrap">{formatDate(order.createdAt)}</TableCell>
                                                    <TableCell className="text-nowrap">
                                                        <Badge className={getStatusBadgeClassName(order.status)}>{LABEL_MAP[order.status]}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                                                <DropdownMenuItem>Customer Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
