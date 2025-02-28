import { ScrollArea } from '../ui/scroll-area'
import DocsMenu from './DocsMenu'

const sidebar = () => {
  return (
    <aside className="hide-scrollbar lg:flex hidden flex-[1] min-w-[230px] flex-col  overflow-y-auto transition-all border-grid fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky">
      <ScrollArea className="h-[37.5rem] ">
        <div className='pr-4 hide-scrollbar'>
          <DocsMenu />
        </div>
      </ScrollArea>
    </aside>
  )
}

export default sidebar