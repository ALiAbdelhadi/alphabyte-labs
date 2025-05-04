"use client"
import { Badge } from "@/components/library/badge";
import { cn } from "@/lib/utils";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DiscountPrice from "../../product-overview-1/components/discounted-price";
import NormalPrice from "../../product-overview-1/components/normal-price";

interface Product {
    productId: string;
    productName: string;
    brand?: string;
    price: number;
    productImages: string[];
    productDiscount: number;
    detailsUrl?: string;
    productDescription?: string;
}

interface ProductCardProps {
    product: Product;
    showBadge?: boolean;
    showShipping?: boolean;
    onAddToCart?: (productId: string) => void;
    className?: string;
    cardWidth?: string;
    isSignedIn?: boolean;
    onAuthRequired?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    showBadge = true,
    showShipping = true,
    onAddToCart,
    className = "",
    cardWidth = "max-w-[300px]",
    isSignedIn = true,
    onAuthRequired,
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleSlideChange = (index: number) => setCurrentIndex(index);
    const handleDetailsClick = () => setIsClicked(true);

    const handleAddToCart = () => {
        if (!isSignedIn && onAuthRequired) {
            onAuthRequired();
            return;
        }
        onAddToCart?.(product.productId);
    };

    return (
        <div className={cn("relative select-none", cardWidth, className)}>
            <div className="absolute top-2 left-2 z-10 px-2 py-1 flex items-center gap-2 text-xs text-white bg-[#676769] rounded-tr-md rounded-br-md">
                <Truck className="w-4 h-4" />
                <span>Fast Shipping</span>
            </div>
            <div className="absolute top-0 right-0 z-10">
                <Badge className="rounded-none text-sm bg-red-500 text-white">
                    {Math.round(product.productDiscount * 100)}% OFF
                </Badge>
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="w-full h-52 relative overflow-hidden">
                    {product.productImages.length > 0 && (
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            useKeyboardArrows
                            infiniteLoop={false}
                            autoPlay={false}
                            selectedItem={currentIndex}
                            onChange={handleSlideChange}
                            renderArrowPrev={(onClick, hasPrev) =>
                                hasPrev && (
                                    <button
                                        type="button"
                                        onClick={onClick}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/80 dark:bg-black/30 rounded-full"
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke="currentColor" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </button>
                                )
                            }
                            renderArrowNext={(onClick, hasNext) =>
                                hasNext && (
                                    <button
                                        type="button"
                                        onClick={onClick}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/80 dark:bg-black/30 rounded-full"
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path stroke="currentColor" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                )
                            }
                        >
                            {product.productImages.map((image, idx) => (
                                <div key={idx} className="w-full h-full">
                                    <Image
                                        src={image}
                                        alt={product.productName}
                                        width={500}
                                        height={300}
                                        quality={90}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </div>
                <div className="mt-1 space-y-2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        {product.productName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {product.productDescription}
                    </p>
                    <div>
                        {product.productDiscount > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="text-lg text-red-600 font-semibold">
                                    <DiscountPrice price={product.price} discount={product.productDiscount} />
                                </span>
                                <s className="text-gray-500 text-sm">
                                    <NormalPrice price={product.price} />
                                </s>
                            </div>
                        ) : (
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                <NormalPrice price={product.price} />
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Link
                            href={product.detailsUrl || '#'}
                            className={cn(
                                "flex-1 text-center px-4 py-2 text-sm font-medium border border-gray-800 rounded hover:bg-gray-800 hover:text-white dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800 transition-colors",
                                isClicked
                                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                                    : ''
                            )}
                            onClick={handleDetailsClick}
                        >
                            More Details
                        </Link>

                        <button
                            onClick={handleAddToCart}
                            className="bg-black rounded py-1 px-2 flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                width={20}
                                height={20}
                                fill="white"
                            >
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;