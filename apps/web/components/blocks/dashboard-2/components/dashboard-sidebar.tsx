import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertTriangle,
  BarChart3,
  Home,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

const data = {
  documents: [
    { title: "Overview", href: "/dashboard", icon: Home },
    { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    {
      title: "Sold Out Products",
      href: "/dashboard/sold-out",
      icon: AlertTriangle,
    },
    { title: "Products", href: "/dashboard/products", icon: Package },
    { title: "Customers", href: "/dashboard/customers", icon: Users },
    { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export default function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
