import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "./components/header"
import { OrdersCards } from "./components/orders-cards"
import { OrdersChart } from "./components/orders-chart"
import { OrdersTable } from "./components/orders-table"
import { OrdersSidebar } from "./components/sidebar"
import ordersData from "./constant/data.json"

export default function OrdersPage() {
    return (
        <SidebarProvider>
            <OrdersSidebar variant="inset" />
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col px-4 lg:px-6">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <OrdersCards />
                            <div>
                                <OrdersChart />
                            </div>
                            <OrdersTable data={ordersData} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
