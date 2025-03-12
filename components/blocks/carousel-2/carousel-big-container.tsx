import Link from "next/link"
import { CarouselBigDataForBlock } from "@/constant/blocks"

import { CardProject, CarouselProject } from "./carousel-big-card"

const CarouselCompForProject = () => {
  const projectCards = CarouselBigDataForBlock.map((project, index) => (
    <Link href={project.link} key={project.id} className="not-prose">
      <CardProject project={project} index={index} />
    </Link>
  ))
  return <CarouselProject items={projectCards} />
}

export default CarouselCompForProject
