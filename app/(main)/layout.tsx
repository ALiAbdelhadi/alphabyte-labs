import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/Header'
import { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
   return (
      <div>
         <Header />
         <main role="main">
            {children}
         </main>
         <Footer />
      </div>
   )
}

export default MainLayout