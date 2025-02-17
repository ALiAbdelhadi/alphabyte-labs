
import CarouselCompForProject from '@/components/blocks/Carousel/CarouselBigContainer'
import CarouselContainer from '@/components/blocks/Carousel/CarouselContainer'
import Timeline from '@/components/blocks/Timeline'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { TimeLineData } from '@/constant/blocks'
import Link from 'next/link'

const BlocksPage = () => {
   return (
      <div className='py-8'>
         <Container>
            <section className='my-14 md:my-16 space-y-3'>
               <div className='space-y-2'>
                  <h1 className='text-3xl md:text-4xl font-bold'>Building Blocks for the Web</h1>
                  <p className='text-lg md:text-xl font-light max-w-2xl text-foreground'>Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.</p>
               </div>
               <div className='space-x-2'>
                  <Link href="/blocks/carousel">
                     <Button>
                        Get started
                     </Button>
                  </Link>
               </div>
            </section>
         </Container>
         {/* Blocks */}
         {/* Block one */}
         <Container>
            <div className='space-y-8'>
               <h1 className='text-4xl font-medium mb-4'>Carousels</h1>
               <section className='border px-8 rounded-3xl'>
                  <CarouselCompForProject />
               </section>
               {/* Block two */}
               <h1 className='text-4xl font-medium mb-4'>Carousels Two</h1>
               <section className='border px-8 rounded-3xl'>
                  <CarouselContainer />
               </section>
               {/* Block Three */}
               <h1 className='text-4xl font-medium mb-4'>Timeline</h1>
               <section className='border px-8 rounded-3xl'>
                  <Timeline data={TimeLineData} />
               </section>
            </div>
         </Container>
      </div>
   )
}

export default BlocksPage