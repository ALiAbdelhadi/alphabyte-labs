
import Link from 'next/link';
import { CardProject, CarouselProject } from './carousel-big-card';
import { CarouselBigDataForBlock } from '@/constant/blocks';

const CarouselCompForProject = () => {
   const projectCards = CarouselBigDataForBlock.map((project, index) => (
      <Link href={project.link} key={project.id} className='not-prose'>
         <CardProject project={project} index={index} />
      </Link>
   ));
   return (
      <CarouselProject items={projectCards} />
   )
}

export default CarouselCompForProject