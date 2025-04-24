import { Card, Carousel } from "./carousel";
import { CarouselBigDataForBlock } from "@/registry/view/carousel-1/constant";
import Link from "next/link";

const CarouselContainer = () => {
  const projectCards = CarouselBigDataForBlock.map((project, index) => (
    <Link href={project.link} key={project.id} className="not-prose">
      <Card project={project} index={index} />
    </Link>
  ));
  return <Carousel items={projectCards} />;
};

export default CarouselContainer;
