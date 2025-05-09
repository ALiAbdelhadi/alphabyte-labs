import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/library/separator"

export function Header() {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear px-4 lg:px-6">
            <div className="flex w-full items-center gap-1">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">Orders</h1>
            </div>
        </header>
    )
}
