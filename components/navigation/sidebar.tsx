import { ScrollArea } from '../ui/scroll-area'
import DocsMenu from './DocsMenu'

const sidebar = () => {
  return (
    <aside className="lg:flex hidden flex-[1] min-w-[230px] sticky top-16 flex-col h-[94.5vh] overflow-y-auto transition-all">
      <ScrollArea className="py-4 h-[37.5rem]">
        <DocsMenu />
      </ScrollArea>
    </aside>
  )
}

export default sidebar