"use client";
import { Button } from "@/components/library/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductImagesProps = {
    productImages: string[];
};

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const handleSlideChange = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative">
            <Carousel
                showThumbs={true}
                showStatus={false}
                useKeyboardArrows={true}
                infiniteLoop={false}
                autoPlay={false}
                selectedItem={currentIndex}
                onChange={handleSlideChange}
                renderThumbs={() =>
                    productImages.map((img, index) => (
                        <div key={index} className="thumbnail-wrapper">
                            <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                width={64}
                                height={64}
                                className="object-cover rounded thumbnail-image"
                            />
                        </div>
                    ))
                }
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            onClick={onClickHandler}
                            title={label}
                            className="absolute z-[2] w-[35px] h-[35px] left-0 rounded-full bg-gray-50 dark:bg-gray-950 cursor-pointer border-none shadow-md flex items-center justify-center"
                            style={{
                                top: "calc(50% - 20px)",
                            }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            onClick={onClickHandler}
                            title={label}
                            className="absolute z-[2] w-[35px] h-[35px] right-0 rounded-full bg-gray-50 dark:bg-gray-950 cursor-pointer border-none shadow-md flex items-center justify-center"
                            style={{
                                top: "calc(50% - 20px)",
                            }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )
                }
            >
                {productImages.map((img, index) => (
                    <div key={index} className="w-full aspect-square">
                        <Image
                            src={img}
                            alt={`Product image ${index + 1}`}
                            width={700}
                            height={700}
                            priority
                            quality={100}
                            className="object-cover rounded-lg w-[20rem]"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ProductImages;
