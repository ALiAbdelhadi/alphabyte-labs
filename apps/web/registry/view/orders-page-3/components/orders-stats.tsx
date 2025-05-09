"use client"

import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, PackageIcon, ShoppingCartIcon, TruckIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/library/card"

export function OrdersStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">12%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                    <PackageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">145</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <ArrowUpIcon className="mr-1 h-3 w-3 text-amber-500" />
                        <span className="text-amber-500">8%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Shipped Orders</CardTitle>
                    <TruckIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">842</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">16%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$48,294</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                        <span className="text-red-500">3%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
