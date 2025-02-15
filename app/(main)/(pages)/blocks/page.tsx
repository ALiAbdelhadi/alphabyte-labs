import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BlocksPage = () => {
   return (
      <div className='min-h-[86.5vh] py-8'>
         <Container>
            <section className='my-14 md:my-16 space-y-3'>
               <div>
                  <h1 className='text-3xl md:text-4xl font-bold'>Build your component library</h1>
                  <p className='text-lg md:text-xl font-light max-w-2xl text-foreground -mt-3'>A set of beautifully-designed, accessible, and customizable components to help you build your component library. Open Source.</p>
               </div>
               <div className='space-x-2'>
                  <Link href="/docs/blocks">
                     <Button>
                        Browse blocks
                     </Button>
                  </Link>
               </div>
            </section>
            {/* Blocks */}
            <section>
            </section>
         </Container>
      </div>
   )
}

export default BlocksPage