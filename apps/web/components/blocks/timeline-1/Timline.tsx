"use client";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const cardVariants: Variants = {
  offscreen: {
    y: 75,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const pointVariants: Variants = {
  offscreen: {
    scale: 0,
    opacity: 0,
  },
  onscreen: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const Timeline = ({ data }: { data: TimeLineProps[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 50%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full my-24" ref={containerRef}>
      <Container>
        <div className="mb-10 lg:mb-14">
          <h2 className="text-3xl md:text-4xl mb-4 text-center font-bold">
            How it works?
          </h2>
          <p className="text-muted-foreground text-center text-base md:text-lg">
            We work in a structured way. Here is how you will be onboard:
          </p>
        </div>
        <div ref={ref} className="relative">
          <div className="absolute my-4 left-4 md:left-1/2 top-0 h-full w-[3px] bg-neutral-200 md:-translate-x-1/2">
            <motion.div
              data-animating
              ref={ref}
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-full bg-primary rounded-full"
            />
          </div>
          {data.map((item, index) => {
            const isEven = index % 2 !== 0;
            return (
              <motion.div
                data-animating
                ref={ref}
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.6 }}
                className={cn(
                  "flex flex-col md:flex-row items-start mb-16 md:mb-24",
                  isEven ? "md:flex-row-reverse" : "",
                )}
              >
                <motion.div
                  variants={pointVariants}
                  viewport={{ once: true }}
                  className="absolute my-4 left-1.5 ml-[3px] lg:-ml-[8.5px] md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2"
                />
                <motion.div
                  variants={cardVariants}
                  className={cn(
                    "w-full md:w-5/12 pl-12 md:pl-0 md:h-[70vh] h-[50vh]",
                    isEven ? "md:pl-8" : "md:pr-8",
                  )}
                >
                  <h3 className="text-sm font-semibold text-primary">
                    {item.title}
                  </h3>
                  <div>{item.content}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default Timeline;
