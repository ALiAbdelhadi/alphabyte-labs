import { DocsRouting } from "@/settings/docs-routing"
import { ScrollArea } from "../library/scroll-area"
import DocsSidebar from "./docs-sidebar"

const sidebar = () => {
  return (
    <aside className="md:flex hidden flex-[1] lg:min-w-[230px] min-w-[200px] flex-col transition-all border-grid fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky">
      <ScrollArea className="h-full">
        <div className="h-full overflow-auto py-6 pr-4 lg:pt-8">
          <div className="pr-4">
            <DocsSidebar config={DocsRouting.sidebarItems} />
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default sidebar
