"use client"

import React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

type ProductImagesProps = {
  productImages: string[]
}

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const handleSlideChange = (index: number) => {
    setCurrentIndex(index)
  }

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
        className="product-carousel"
        thumbWidth={60}
        renderThumbs={() =>
          productImages.map((img, index) => (
            <div key={index} className="thumbnail-wrapper h-12 sm:h-14 md:h-16">
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover rounded-sm thumbnail-image"
              />
            </div>
          ))
        }
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute z-[2] w-8 h-8 sm:w-10 sm:h-10 left-1 sm:left-2 rounded-full bg-gray-50 dark:bg-gray-950 cursor-pointer border-none shadow-md flex items-center justify-center"
              style={{
                top: "calc(50% - 20px)",
              }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute z-[2] w-8 h-8 sm:w-10 sm:h-10 right-1 sm:right-2 rounded-full bg-gray-50 dark:bg-gray-950 cursor-pointer border-none shadow-md flex items-center justify-center"
              style={{
                top: "calc(50% - 20px)",
              }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )
        }
      >
        {productImages.map((img, index) => (
          <div
            key={index}
            className="w-full aspect-square flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Product image ${index + 1}`}
              width={800}
              height={800}
              priority={index === 0}
              quality={90}
              className="max-h-[60vh] mx-auto rounded-lg"
            />
          </div>
        ))}
      </Carousel>
      <style jsx global>{`
        .carousel .thumbs-wrapper {
          margin: 10px 0 !important;
          overflow: hidden;
        }

        .carousel .thumbs {
          padding: 0 !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        /* Better spacing on mobile */
        @media (max-width: 640px) {
          .carousel .thumbs {
            gap: 4px;
          }

          .carousel .thumb {
            margin-right: 0 !important;
          }
        }

        /* Make sure main image container is responsive */
        .carousel .slide img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </div>
  )
}

export default ProductImages
