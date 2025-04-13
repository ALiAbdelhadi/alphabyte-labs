import { CarouselsData } from "@/constant/blocks";
import { Card, Carousel } from "../carousel-2/carousel";

const CarouselContainer = () => {
  const cards = CarouselsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return <Carousel items={cards} />;
};

export default CarouselContainer;
