import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
   return (
      <div className='bg-[#f8f8f9] dark:bg-[#111111]'>{children}</div>
   )
}

export default layout