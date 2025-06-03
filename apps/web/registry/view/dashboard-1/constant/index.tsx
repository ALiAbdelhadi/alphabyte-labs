import { BarChart3, Bell, CreditCard, Home, Package, Settings, ShoppingCart, Star, Truck, Users } from "lucide-react"
import type React from "react"

export interface DashboardItem {
    name: string
    icon: React.ReactNode
    url: string
    badge?: string | number
}

export const DASHBOARDS: DashboardItem[] = [
    {
        name: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        url: "/admin/dashboard",
    },
    {
        name: "Orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        url: "/admin/dashboard/orders",
        badge: "12",
    },
    {
        name: "Products",
        icon: <Package className="h-5 w-5" />,
        url: "/admin/dashboard/products",
    },
    {
        name: "Customers",
        icon: <Users className="h-5 w-5" />,
        url: "/admin/dashboard/customers",
    },
    {
        name: "Analytics",
        icon: <BarChart3 className="h-5 w-5" />,
        url: "/admin/dashboard/analytics",
    },
    {
        name: "Payments",
        icon: <CreditCard className="h-5 w-5" />,
        url: "/admin/dashboard/payments",
    },
    {
        name: "Shipping",
        icon: <Truck className="h-5 w-5" />,
        url: "/admin/dashboard/shipping",
    },
    {
        name: "Reviews",
        icon: <Star className="h-5 w-5" />,
        url: "/admin/dashboard/reviews",
        badge: "3",
    },
    {
        name: "Notifications",
        icon: <Bell className="h-5 w-5" />,
        url: "/admin/dashboard/notifications",
        badge: "5",
    },
    {
        name: "Settings",
        icon: <Settings className="h-5 w-5" />,
        url: "/admin/dashboard/settings",
    },
]
