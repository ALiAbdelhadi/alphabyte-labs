import { getDocsRouting } from "@/settings/docs-routing"
import { ScrollArea } from "../ui/scroll-area"
import DocsSidebar from "./docs-sidebar"

const Sidebar = async () => {
  const docsConfig = await getDocsRouting()

  return (
    <aside
      aria-label="Documentation Sidebar"
      className="md:flex hidden flex-[1] lg:min-w-[230px] min-w-[200px] flex-col transition-all border-grid fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 ltr:border-r rtl:border-l md:sticky"
    >
      <ScrollArea className="h-full">
        <div className={`h-full overflow-auto py-6 pr-4 rtl:pr-0 lg:pt-8`}>
          <div className="pr-4 rtl:pr-0 rtl:pl-1">
            <DocsSidebar config={docsConfig.sidebarItems} />
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar