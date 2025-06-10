
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowDown,
    ArrowUp,
    Bell,
    Calendar,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Package,
    Printer,
    RefreshCw,
    Search,
    Settings,
    Truck,
    X
} from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { formatDate, formatPrice } from "../lib/utils"
import { Sidebar } from "./sidebar"

type OrderStatus = "awaiting_shipment" | "processing" | "fulfilled" | "cancelled"
type SortField = "id" | "customerName" | "totalPrice" | "createdAt" | "status"
type SortDirection = "asc" | "desc"

interface Order {
    id: number
    customerName: string
    customerEmail: string
    customerAvatar?: string
    customerPhone: string
    productName: string
    productImage?: string
    productPrice: number
    quantity: number
    shippingPrice: number
    discountRate: number
    totalPrice: number
    status: OrderStatus
    createdAt: string
    shippingAddress: string
    trackingNumber?: string
    paymentMethod: string
    notes?: string
}

const mockOrders: Order[] = [
    {
        id: 1001,
        customerName: "Ahmed Hassan",
        customerEmail: "ahmed.hassan@email.com",
        customerPhone: "+20 123 456 7890",
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
        shippingAddress: "123 Tahrir Square, Cairo, Egypt",
        trackingNumber: "TRK001234567",
        paymentMethod: "Credit Card",
        notes: "Gift wrapping requested"
    },
    {
        id: 1002,
        customerName: "Fatima Al-Zahra",
        customerEmail: "fatima.zahra@email.com",
        customerPhone: "+20 987 654 3210",
        productName: "MacBook Air M3",
        productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        productPrice: 1299,
        quantity: 1,
        shippingPrice: 0,
        discountRate: 0,
        totalPrice: 1299,
        status: "processing",
        createdAt: "2024-01-14T14:20:00Z",
        shippingAddress: "456 Zamalek District, Cairo, Egypt",
        paymentMethod: "PayPal",
    },
    {
        id: 1003,
        customerName: "Omar Khaled",
        customerEmail: "omar.khaled@email.com",
        customerPhone: "+20 555 123 4567",
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
        shippingAddress: "789 Nasr City, Cairo, Egypt",
        paymentMethod: "Cash on Delivery",
    },
    {
        id: 1004,
        customerName: "Layla Mohammed",
        customerEmail: "layla.mohammed@email.com",
        customerPhone: "+20 111 222 3333",
        productName: "iPad Pro 12.9",
        productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
        productPrice: 1099,
        quantity: 1,
        shippingPrice: 20,
        discountRate: 0.15,
        totalPrice: 954.15,
        status: "cancelled",
        createdAt: "2024-01-13T16:45:00Z",
        shippingAddress: "321 Heliopolis, Cairo, Egypt",
        paymentMethod: "Credit Card",
        notes: "Customer requested cancellation"
    },
    {
        id: 1005,
        customerName: "Youssef Ali",
        customerEmail: "youssef.ali@email.com",
        customerPhone: "+20 444 555 6666",
        productName: "Apple Watch Series 9",
        productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        productPrice: 399,
        quantity: 1,
        shippingPrice: 10,
        discountRate: 0,
        totalPrice: 409,
        status: "fulfilled",
        createdAt: "2024-01-13T11:30:00Z",
        shippingAddress: "654 Maadi, Cairo, Egypt",
        trackingNumber: "TRK009876543",
        paymentMethod: "Bank Transfer",
    },
];

const ORDER_STATUS_DETAILS: Record<OrderStatus, { label: string; badgeClass: string; icon?: React.ElementType; colorClass?: string; }> = {
    awaiting_shipment: {
        label: "Awaiting Shipment",
        badgeClass: "bg-blue-500 text-white hover:bg-blue-600",
        icon: Truck,
        colorClass: "text-blue-600"
    },
    processing: {
        label: "Processing",
        badgeClass: "bg-yellow-500 text-white hover:bg-yellow-600",
        icon: RefreshCw,
        colorClass: "text-yellow-600"
    },
    fulfilled: {
        label: "Fulfilled",
        badgeClass: "bg-green-500 text-white hover:bg-green-600",
        icon: Package,
        colorClass: "text-green-600"
    },
    cancelled: {
        label: "Cancelled",
        badgeClass: "bg-red-500 text-white hover:bg-red-600",
        icon: X,
        colorClass: "text-red-600"
    },
};

const DATE_RANGE_OPTIONS = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
];

const adminUser = {
    name: "Admin User",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    initials: "AU"
};


interface OrdersHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    dateRange: string;
    setDateRange: (range: string) => void;
    onRefresh: () => void;
    onExport: () => void;
}

function OrdersHeader({
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    onRefresh,
    onExport
}: OrdersHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-2 lg:px-4 py-4">
            <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold tracking-tight">Ecommerce Orders</h1>
            </div>
            <div className="ml-auto flex items-center gap-2 ">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search orders by ID, customer, product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-full md:w-64 lg:w-80"
                    />
                </div>
                <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-auto md:w-40">
                        <Calendar className="h-4 w-4 mr-0 md:mr-2" />
                        <span className="hidden md:inline"><SelectValue /></span>
                    </SelectTrigger>
                    <SelectContent>
                        {DATE_RANGE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={onRefresh} variant="ghost" size="icon" aria-label="Refresh orders">
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <Button onClick={onExport} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                            <Bell className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="User account">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={adminUser.avatarUrl} alt={adminUser.name} />
                                <AvatarFallback>{adminUser.initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>My Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

interface OrdersStatsProps {
    orders: Order[];
}

function OrdersStats({ orders }: OrdersStatsProps) {
    const stats = useMemo(() => {
        const initialCounts: Record<OrderStatus, number> = {
            awaiting_shipment: 0,
            processing: 0,
            fulfilled: 0,
            cancelled: 0,
        };
        const statusCounts = orders.reduce((acc, order) => {
            acc[order.status]++;
            return acc;
        }, initialCounts);

        const totalRevenue = orders
            .filter(order => order.status !== "cancelled")
            .reduce((sum, order) => sum + order.totalPrice, 0);

        return {
            totalOrders: orders.length,
            ...statusCounts,
            totalRevenue,
        };
    }, [orders]);

    const statCards = [
        { title: "Total Orders", value: stats.totalOrders, icon: Package, description: "All orders in system" },
        {
            title: ORDER_STATUS_DETAILS.fulfilled.label,
            value: stats.fulfilled,
            iconElement: <div className="h-4 w-4 rounded-full bg-green-500" />,
            valueClass: ORDER_STATUS_DETAILS.fulfilled.colorClass,
            description: "Completed orders"
        },
        {
            title: ORDER_STATUS_DETAILS.processing.label,
            value: stats.processing,
            iconElement: <div className="h-4 w-4 rounded-full bg-yellow-500" />,
            valueClass: ORDER_STATUS_DETAILS.processing.colorClass,
            description: "Being processed"
        },
        {
            title: ORDER_STATUS_DETAILS.awaiting_shipment.label,
            value: stats.awaiting_shipment,
            icon: ORDER_STATUS_DETAILS.awaiting_shipment.icon,
            valueClass: ORDER_STATUS_DETAILS.awaiting_shipment.colorClass,
            description: "Ready to ship"
        },
        {
            title: ORDER_STATUS_DETAILS.cancelled.label,
            value: stats.cancelled,
            icon: ORDER_STATUS_DETAILS.cancelled.icon,
            valueClass: ORDER_STATUS_DETAILS.cancelled.colorClass,
            description: "Cancelled orders"
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {statCards.map((card) => {
                const IconComponent = card.icon;
                return (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            {IconComponent ? <IconComponent className={`h-4 w-4 text-muted-foreground ${card.valueClass || ''}`} /> : card.iconElement}
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${card.valueClass || ''}`}>{card.value}</div>
                            <p className="text-xs text-muted-foreground">{card.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

interface OrderActionsProps {
    order: Order;
}

function OrderActions({ order }: OrderActionsProps) {
    const handleViewOrder = useCallback(() => console.log("View order:", order.id), [order.id]);
    const handleEditOrder = useCallback(() => console.log("Edit order:", order.id), [order.id]);
    const handlePrintInvoice = useCallback(() => console.log("Print invoice:", order.id), [order.id]);
    const handleTrackShipment = useCallback(() => console.log("Track shipment:", order.trackingNumber), [order.trackingNumber]);
    const handleCancelOrder = useCallback(() => console.log("Cancel order:", order.id), [order.id]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={`Actions for order ${order.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Order actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleViewOrder}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEditOrder}>
                    <Settings className="mr-2 h-4 w-4" /> Edit Order
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrintInvoice}>
                    <Printer className="mr-2 h-4 w-4" /> Print Invoice
                </DropdownMenuItem>
                {order.trackingNumber && (
                    <DropdownMenuItem onClick={handleTrackShipment}>
                        <Truck className="mr-2 h-4 w-4" /> Track Shipment
                    </DropdownMenuItem>
                )}
                {order.status !== "cancelled" && order.status !== "fulfilled" && (
                    <DropdownMenuItem onClick={handleCancelOrder} className="text-red-600 hover:!text-red-600 focus:text-red-600">
                        <X className="mr-2 h-4 w-4" /> Cancel Order
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface OrderRowProps {
    order: Order;
}

function OrderRow({ order }: OrderRowProps) {
    const customerInitials = useMemo(() =>
        order.customerName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
        [order.customerName]
    );

    const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop";
    }, []);

    const handleAvatarError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (event.target as HTMLImageElement).style.display = 'none';
    }, []);

    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="font-medium text-nowrap">#{order.id}</TableCell>
            <TableCell className="min-w-[200px]">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={order.customerAvatar}
                            alt={`${order.customerName}'s avatar`}
                            onError={handleAvatarError}
                        />
                        <AvatarFallback>{customerInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium truncate" title={order.customerName}>{order.customerName}</div>
                        <div className="text-sm text-muted-foreground truncate" title={order.customerEmail}>{order.customerEmail}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell className="min-w-[180px]">
                <div className="flex items-center gap-3">
                    <img
                        src={order.productImage || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"}
                        alt={order.productName}
                        className="h-10 w-10 rounded-md object-cover"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <span className="font-medium text-nowrap truncate" title={order.productName}>{order.productName}</span>
                </div>
            </TableCell>
            <TableCell className="text-right text-nowrap">
                {order.discountRate > 0 ? (
                    <>
                        <div className="line-through text-xs text-muted-foreground">
                            {formatPrice(order.productPrice)}
                        </div>
                        <div className="font-medium">
                            {formatPrice(order.productPrice * (1 - order.discountRate))}
                        </div>
                    </>
                ) : (
                    <div className="font-medium">{formatPrice(order.productPrice)}</div>
                )}
            </TableCell>
            <TableCell className="text-center text-nowrap">
                {order.discountRate > 0 ? (
                    <Badge variant="secondary">{Math.round(order.discountRate * 100)}% OFF</Badge>
                ) : (
                    <span className="text-muted-foreground">-</span>
                )}
            </TableCell>
            <TableCell className="text-center">{order.quantity}</TableCell>
            <TableCell className="text-right text-nowrap">
                {order.shippingPrice > 0 ? formatPrice(order.shippingPrice) : <Badge variant="outline">Free</Badge>}
            </TableCell>
            <TableCell className="text-right font-semibold text-base text-nowrap">{formatPrice(order.totalPrice)}</TableCell>
            <TableCell className="text-nowrap">{formatDate(order.createdAt)}</TableCell>
            <TableCell className="text-nowrap">
                <Badge className={ORDER_STATUS_DETAILS[order.status].badgeClass}>
                    {ORDER_STATUS_DETAILS[order.status].label}
                </Badge>
            </TableCell>
            <TableCell className="text-nowrap">{order.paymentMethod}</TableCell>
            <TableCell className="text-center text-nowrap">
                {order.trackingNumber ? (
                    <Badge variant="outline" className="font-mono text-xs">
                        {order.trackingNumber}
                    </Badge>
                ) : (
                    <span className="text-muted-foreground">-</span>
                )}
            </TableCell>
            <TableCell className="text-center">
                <OrderActions order={order} />
            </TableCell>
        </TableRow>
    );
}

export default function OrdersPage() {
    const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [dateRange, setDateRange] = useState("all")
    const [sortField, setSortField] = useState<SortField>("createdAt")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

    const [orders, setOrders] = useState<Order[]>(mockOrders);

    const orderCountsByStatus = useMemo(() => {
        const counts: Record<OrderStatus | "all", number> = {
            all: orders.length,
            awaiting_shipment: 0,
            processing: 0,
            fulfilled: 0,
            cancelled: 0,
        };
        orders.forEach(order => {
            if (counts[order.status] !== undefined) {
                counts[order.status]++;
            }
        });
        return counts;
    }, [orders]);

    const filteredAndSortedOrders = useMemo(() => {
        let processedOrders = [...orders];

        if (activeFilter !== "all") {
            processedOrders = processedOrders.filter(order => order.status === activeFilter);
        }

        if (dateRange !== "all") {
            const now = new Date();
            let startDateFilter: Date | null = null;

            switch (dateRange) {
                case "today":
                    startDateFilter = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
                    break;
                case "week":
                    const firstDayOfWeek = new Date(now);
                    firstDayOfWeek.setDate(now.getDate() - now.getDay());
                    firstDayOfWeek.setHours(0, 0, 0, 0);
                    startDateFilter = firstDayOfWeek;
                    break;
                case "month":
                    startDateFilter = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case "quarter":
                    const currentQuarter = Math.floor(now.getMonth() / 3);
                    startDateFilter = new Date(now.getFullYear(), currentQuarter * 3, 1);
                    break;
            }
            if (startDateFilter) {
                processedOrders = processedOrders.filter(order => new Date(order.createdAt) >= startDateFilter!);
            }
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            processedOrders = processedOrders.filter(order =>
                order.id.toString().includes(query) ||
                order.customerName.toLowerCase().includes(query) ||
                order.customerEmail.toLowerCase().includes(query) ||
                order.productName.toLowerCase().includes(query) ||
                (order.trackingNumber && order.trackingNumber.toLowerCase().includes(query))
            );
        }

        processedOrders.sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];

            let comparison = 0;

            if (typeof valA === 'number' && typeof valB === 'number') {
                comparison = valA - valB;
            } else if (sortField === 'createdAt') {
                comparison = new Date(valA as string).getTime() - new Date(valB as string).getTime();
            } else if (typeof valA === 'string' && typeof valB === 'string') {
                comparison = valA.toLowerCase().localeCompare(valB.toLowerCase());
            } else {
                if (valA > valB) comparison = 1;
                else if (valA < valB) comparison = -1;
            }

            return sortDirection === "asc" ? comparison : -comparison;
        });

        return processedOrders;
    }, [orders, activeFilter, searchQuery, dateRange, sortField, sortDirection]);

    const handleRefresh = useCallback(() => {
        console.log("Refreshing orders...");
        setOrders([...mockOrders]);
        setSearchQuery("");
        setActiveFilter("all");
        setDateRange("all");
        setSortField("createdAt");
        setSortDirection("desc");
    }, []);

    const handleExport = useCallback(() => {
        console.log("Exporting orders...", filteredAndSortedOrders);
        if (filteredAndSortedOrders.length > 0) {
            const headers = Object.keys(filteredAndSortedOrders[0]).join(",");
            const rows = filteredAndSortedOrders.map(order =>
                Object.values(order).map(val => typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val).join(",")
            ).join("\n");
            const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.warn("No data to export.");
        }
    }, [filteredAndSortedOrders]);

    const handleSort = useCallback((field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    }, [sortField]);

    const SortIndicator = useCallback(({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        const Icon = sortDirection === "asc" ? ArrowUp : ArrowDown;
        return <Icon className="ml-1 h-3 w-3 text-muted-foreground" />;
    }, [sortField, sortDirection]);

    const tableHeaders: Array<{ key: SortField | string; label: string; sortable?: boolean; className?: string, cellClassName?: string }> = [
        { key: "id", label: "Order ID", sortable: true, className: "w-[100px]" },
        { key: "customerName", label: "Customer", sortable: true },
        { key: "productName", label: "Product" },
        { key: "productPrice", label: "Unit Price", sortable: true, className: "text-right" },
        { key: "discountRate", label: "Discount", className: "text-center" },
        { key: "quantity", label: "Qty", className: "text-center" },
        { key: "shippingPrice", label: "Shipping", className: "text-right" },
        { key: "totalPrice", label: "Total", sortable: true, className: "text-right font-semibold" },
        { key: "createdAt", label: "Date", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "paymentMethod", label: "Payment" },
        { key: "trackingNumber", label: "Tracking", className: "text-center" },
        { key: "actions", label: "Actions", className: "text-center w-[50px]" },
    ];

    return (
        <>
            <Sidebar />
            <div className="min-h-screen">
                <OrdersHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    onRefresh={handleRefresh}
                    onExport={handleExport}
                />
                <main className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Orders</h2>
                            <p className="text-muted-foreground">
                                Manage, track, and process all customer orders efficiently.
                            </p>
                        </div>
                        <OrdersStats orders={orders} />
                        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as OrderStatus | "all")} className="pt-4">
                            <TabsList>
                                <TabsTrigger value="all">All Orders ({orderCountsByStatus.all})</TabsTrigger>
                                {Object.keys(ORDER_STATUS_DETAILS).map(statusKey => (
                                    <TabsTrigger key={statusKey} value={statusKey}>
                                        {ORDER_STATUS_DETAILS[statusKey as OrderStatus].label} ({orderCountsByStatus[statusKey as OrderStatus]})
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <Card>
                            <CardHeader className="px-7">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Orders Overview</CardTitle>
                                        <CardDescription>
                                            Detailed list of all customer orders and their statuses.
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => console.log("Advanced Filters Clicked")}>
                                        <Filter className="mr-2 h-4 w-4" />
                                        Advanced Filters
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {tableHeaders.map(th => (
                                                    <TableHead
                                                        key={th.key}
                                                        className={`${th.className || ''} ${th.sortable ? 'cursor-pointer hover:bg-muted' : ''} text-nowrap`}
                                                        onClick={th.sortable ? () => handleSort(th.key as SortField) : undefined}
                                                        aria-sort={th.sortable && sortField === th.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                                                    >
                                                        <div className="flex items-center">
                                                            {th.label}
                                                            {th.sortable && <SortIndicator field={th.key as SortField} />}
                                                        </div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredAndSortedOrders.length > 0 ? (
                                                filteredAndSortedOrders.map((order) => (
                                                    <OrderRow key={order.id} order={order} />
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={tableHeaders.length} className="h-24 text-center">
                                                        <div className="flex flex-col items-center justify-center space-y-2 py-8">
                                                            <Package className="h-12 w-12 text-muted-foreground" />
                                                            <h3 className="text-lg font-medium">No orders found.</h3>
                                                            <p className="text-muted-foreground text-sm">
                                                                {searchQuery ? "Try adjusting your search or filter criteria." : "No orders match the current filters."}
                                                            </p>
                                                            {(searchQuery || activeFilter !== 'all' || dateRange !== 'all') &&
                                                                <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                                                                    Clear Filters & Search
                                                                </Button>
                                                            }
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}