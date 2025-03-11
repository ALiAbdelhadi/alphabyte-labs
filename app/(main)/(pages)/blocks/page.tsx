import BlockForGrid from '@/components/BlockForGrid'
import CarouselCompForProject from '@/components/blocks/carousel-2/carousel-big-container'
import CarouselContainer from '@/components/blocks/carousel-1/carousel-container'
import TimelineContainer from '@/components/blocks/timeline-1/TimelineContainer'
import Container from '@/components/Container'
import { Button } from '@/components/library/button'
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
                  <Link href="#browse-all-blocks">
                     <Button variant={"ghost"}>Browse All Blocks</Button>
                  </Link>
               </div>
            </section>
         </Container>
         {/* Blocks */}
         {/* Block one */}
         <div className='py-10 md:py-12'>
            <Container>
               <h2 className='text-muted-foreground mb-3'>Latest Blocks</h2>
               <div className='space-y-8'>
                  <h3 className='text-3xl font-medium mb-4'>Carousels</h3>
                  <section className='border px-2.5 lg:px-8 rounded-3xl bg-[#f8f8f9] dark:bg-[#111111]'>
                     <CarouselCompForProject />
                  </section>
                  {/* Block two */}
                  <h3 className='text-3xl font-medium mb-4'>Carousels Two</h3>
                  <section className='border px-2.5 lg:px-8 rounded-3xl bg-[#f8f8f9] dark:bg-[#111111]'>
                     <CarouselContainer />
                  </section>
                  {/* Block Three */}
                  <h3 className='text-3xl font-medium mb-4'>Timeline</h3>
                  <section className='border lg:px-8 rounded-3xl bg-[#f8f8f9] dark:bg-[#111111]'>
                     <TimelineContainer />
                  </section>
               </div>
               {/* Tons Of Blocks Ready to copy and past or even download it */}
               <div id='browse-all-blocks' className='py-10 md:py-14 lg:py-20'>
                  <div className='space-y-2'>
                     <h2 className='lg:text-3xl text-2xl font-semibold'>Shadcn ui blocks</h2>
                     <p className='text-lg md:text-xl font-light text-foreground'>Ready to copy&paste</p>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                     <BlockForGrid
                        title='Carousel1'
                        href='/blocks/carousel-1'
                        src={'/block-mokeup/carousel/carousel-1.png'}
                     />
                     <BlockForGrid
                        title='Carousel2'
                        href='/blocks/carousel-2'
                        src={'/block-mokeup/carousel/carousel-2.png'}
                     />
                     <BlockForGrid
                        title='Timeline'
                        href='/blocks/timeline-1'
                        src={'/block-mokeup/timeline/timeline-1.png'}
                     />
                     <BlockForGrid
                        title='Navbar'
                        href='/blocks/navbar-1'
                        src={'/block-mokeup/navbar/navbar-1.png'}
                     />
                     <BlockForGrid
                        title='New Collection'
                        href='/blocks/new-collection-1'
                        src={'/block-mokeup/new-collection/new-collection.png'}
                     />
                     <BlockForGrid
                        title='About1'
                        href='/blocks/about-1'
                        src={'/block-mokeup/about/about-1.png'}
                     />
                  </div>
               </div>
            </Container>
         </div>
      </div >
   )
}

export default BlocksPage