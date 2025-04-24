import Link from "next/link";
import { CarouselBigDataForBlock } from "../constant/index";
import { Card, Carousel } from "./carousel";

const CarouselContainer = () => {
  const projectCards = CarouselBigDataForBlock.map((project, index) => (
    <Link href={project.link} key={project.id} className="not-prose">
      <Card project={project} index={index} />
    </Link>
  ));
  return <Carousel items={projectCards} />;
};

export default CarouselContainer;
