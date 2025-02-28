import { ReactNode } from 'react'

const ContainerWrapper = ({ children }: { children: ReactNode }) => {
   return (
      <div className='border-r border-l border-border mr-auto ml-auto w-full max-w-[1450px] border-dashed h-full'>{children}</div>
   )
}

export default ContainerWrapper