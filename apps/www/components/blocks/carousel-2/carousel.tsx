"use client";
import { useOutsideClick } from "@/hooks/out-side-click";
import { cn } from "@/lib/utils";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import {
  createContext,
  Fragment,
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  cardGap?: number;
  scrollOffset?: number;
}

interface Card {
  src: string;
  title: string;
  category: string;
}
const CarouselContext = createContext<{
  onCardClick: (index: number) => void;
  currentIndex: number;
}>({
  onCardClick: () => { },
  currentIndex: 0,
});
export const Carousel = ({
  items,
  initialScroll = 0,
  cardGap = 16,
  scrollOffset = 300,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const checkScrollAbility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollAbility();
    }
  }, [initialScroll]);
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollOffset : scrollOffset,
        behavior: "smooth",
      });
    }
  };
  const handleCarsouelClick = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <CarouselContext.Provider
      value={{ onCardClick: handleCarsouelClick, currentIndex }}
    >
      <div className="relative w-full py-0 !my-12 ">
        <div className="flex justify-end space-x-2">
          <button
            className="relative z-40 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-7 w-7 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-7 w-7 text-gray-500" />
          </button>
        </div>
        <div
          className="flex w-full overflow-x-scroll py-6 scroll-smooth  [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollAbility}
        >
          <div
            className="flex flex-row justify-end"
            style={{ gap: `${cardGap}px` }}
          >
            {items.map((item, index) => (
              <motion.div
                data-animating
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 * index },
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};
export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => setIsOpen(false));
  const handleCardClick = () => {
    setIsOpen(true);
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  return (
    <Fragment>
      <motion.div
        ref={cardRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleCardClick}
        className="rounded-3xl cursor-pointer bg-gray-100 dark:bg-neutral-900 h-[18rem] md:h-[37rem] w-56 md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10zz"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-4 md:p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white/60 text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-lg md:text-xl lg:text-3xl font-semibold max-w-xs text-left"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.div>
    </Fragment>
  );
};
export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
