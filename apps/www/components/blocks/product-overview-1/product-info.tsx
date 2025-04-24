"use client";

import { Button } from "@/components/library/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import DiscountPrice from "./discounted-price";
import NormalPrice from "./normal-price";
import { ColorTemperatureSelector, ProductColorTemp } from "./product-color-temp-button";
import { ProductIP, ProductIPSelector } from "./product-ip-buttons";

interface ProductConfigurationPanelProps {
    productName: string;
    productCode?: string;
    description: string;
    displayPrice: number;
    originalPrice?: number;
    discountPercentage?: number;
    quantity: number;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
    canDecreaseQuantity: boolean;
    showIpSelector: boolean;
    selectedIp: ProductIP; // Changed from optional to required
    onIpChange: (newIp: ProductIP) => void; // Changed from optional to required
    isIpSelectorDisabled?: boolean;
    showColorTempSelector?: boolean;
    selectedColorTemp: ProductColorTemp; // Changed from optional to required
    onColorTempChange: (newColorTemp: ProductColorTemp) => void; // Changed from optional to required
    isColorTempSelectorDisabled?: boolean;
    showLampSelector: boolean;
    isLampSelectorDisabled?: boolean;
    basePriceForLamp?: number;
    hNumberForLamp?: number;
    onAddToCart: () => void;
    isAddToCartLoading: boolean;
    addToCartLabel?: string;
    onOrderNow: () => void;
    isOrderNowLoading: boolean;
    orderNowLabel?: string;
    stockStatus: "inStock" | "outOfStock" | "checkAvailability";
    stockStatusText?: string;
    availabilityCheckCta?: string
    specifications?: { [key: string]: string };
}

export function ProductConfigurationPanel({
    productName,
    productCode = "PRODUCT-CODE",
    description,
    displayPrice,
    originalPrice,
    discountPercentage,
    quantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    canDecreaseQuantity,
    showIpSelector,
    selectedIp,
    onIpChange,
    isIpSelectorDisabled,
    showColorTempSelector = true,
    selectedColorTemp,
    onColorTempChange,
    isColorTempSelectorDisabled,
    showLampSelector,
    onAddToCart,
    isAddToCartLoading,
    addToCartLabel = "Add to Cart",
    onOrderNow,
    isOrderNowLoading,
    orderNowLabel = "Order Now",
    stockStatus,
    stockStatusText = "In Stock",
    availabilityCheckCta = "Check Stores Availability",
    specifications,
}: ProductConfigurationPanelProps) {
    return (
        <div className="lg:ml-16 sm:ml-7">
            <h1 className="lg:text-3xl md:text-[24px] lg:mt-5 mb-2 font-bold uppercase">
                {productCode}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-3">
                {description}
            </p>
            <div className="flex flex-col mb-1 ">
                <div className={cn("grid gap-x-12 gap-y-4",
                    (showColorTempSelector || showIpSelector) ? "sm:grid-cols-2" : "sm:grid-cols-1"
                )}>
                    <div className="space-y-4">
                        {showColorTempSelector && (
                            <ColorTemperatureSelector
                                value={selectedColorTemp}
                                onValueChange={onColorTempChange}
                                disabled={isColorTempSelectorDisabled || isOrderNowLoading || isAddToCartLoading}
                            />
                        )}
                        {showIpSelector && (
                            <ProductIPSelector
                                value={selectedIp}
                                onValueChange={onIpChange}
                                disabled={isIpSelectorDisabled || isOrderNowLoading || isAddToCartLoading}
                                title="Water Resistance (IP)"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="my-4 flex items-center space-x-3">
                {discountPercentage && originalPrice ? (
                    <>
                        <span className="text-lg font-semibold">
                            <DiscountPrice
                                price={displayPrice}
                                discount={discountPercentage}
                                quantity={1}
                            />
                        </span>
                        <s className="text-gray-500 italic ml-1.5 text-base">
                            <NormalPrice price={originalPrice} quantity={1} />
                        </s>
                        <span className="text-green-500 font-semibold">
                            {discountPercentage * 100}% OFF
                        </span>
                    </>
                ) : (
                    <span className="text-lg font-semibold">
                        <NormalPrice price={displayPrice} quantity={1} />
                    </span>
                )}
                {quantity > 1 && (
                    <span className="text-muted-foreground text-sm ml-4">
                        (Total: ${(displayPrice * quantity).toFixed(2)})
                    </span>
                )}
            </div>
            <div className="flex justify-between w-full mb-4">
                <button className="text-primary md:text-xl sm:text-lg text-base flex items-center hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                    disabled={stockStatus !== 'checkAvailability'}
                >
                    {availabilityCheckCta}
                    <ArrowRight className="sm:w-6 sm:h-6 w-5 h-5 ml-2" />
                </button>
                <p className={cn(
                    "md:text-lg text-[16px]",
                    stockStatus === 'inStock' ? "text-green-400" : "text-red-500"
                )}>
                    {stockStatusText}
                </p>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2 mt-4 max-w-full">
                    <div className="rounded flex flex-row items-center">
                        <Button
                            size="icon"
                            onClick={onDecreaseQuantity}
                            disabled={!canDecreaseQuantity || isOrderNowLoading || isAddToCartLoading}
                            className="sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem] shadow-md hover:shadow-lg transition-shadow bg-gray-950 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Minus className="md:w-5 md:h-5 h-4 w-4" />
                        </Button>
                        <span className="text-lg md:mx-5 my-2 mx-3 w-8 text-center">{quantity}</span>
                        <Button
                            size="icon"
                            onClick={onIncreaseQuantity}
                            disabled={isOrderNowLoading || isAddToCartLoading}
                            className="sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem] shadow-md hover:shadow-lg transition-shadow bg-gray-950 hover:bg-black dark:bg-gray-100 dark:hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="md:w-5 md:h-5 h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        onClick={onAddToCart}
                        disabled={isAddToCartLoading || isOrderNowLoading || stockStatus !== 'inStock'}
                        className="bg-primary text-white md:px-4 md:py-3 px-2.5 py-2.5 md:text-base text-sm w-full rounded uppercase flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isAddToCartLoading ? "Adding..." : addToCartLabel}
                        {!isAddToCartLoading && (
                            <ShoppingCart className="ml-2 w-5 h-5" />
                        )}
                    </Button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 max-w-full">
                    <button
                        onClick={onOrderNow}
                        disabled={isOrderNowLoading || isAddToCartLoading || stockStatus !== 'inStock'}
                        className={cn(
                            "border-gray-950 dark:border-gray-50 transition-colors duration-300 bg-gray-50 dark:bg-transparent border-[1.5px] md:px-4 md:py-3 px-2.5 py-2.5 md:text-base text-sm w-full rounded",
                            "hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-950 dark:text-gray-100 dark:bg-background",
                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
                        )}
                    >
                        {isOrderNowLoading ? "Processing..." : orderNowLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}