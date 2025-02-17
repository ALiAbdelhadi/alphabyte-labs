import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
   return (
      <div className='bg-[#f8f8f9]'>{children}</div>
   )
}

export default layout