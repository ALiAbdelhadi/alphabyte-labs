import { ScrollArea } from '../ui/scroll-area'
import DocsMenu from './DocsMenu'

const sidebar = () => {
  return (
    <aside className="hide-scrollbar md:flex hidden flex-[1] min-w-[230px] flex-col  overflow-y-auto transition-all border-grid fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky">
      <div className='md:hide-scroll bar h-full overflow-auto py-6 pr-4 lg:py-8'>
        <div className='pr-4'>
          <DocsMenu />
        </div>
      </div>
    </aside>
  )
}

export default sidebar